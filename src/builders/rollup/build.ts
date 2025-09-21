import type { OutputOptions, OutputChunk } from "rollup";
import { rollup } from "rollup";
import dts from "rollup-plugin-dts";
import { resolve } from "pathe";
import type { BuildContext } from "../../types";
import { removeShebangPlugin } from "./plugins/shebang";
import consola from "consola";
import { getRollupOptions } from "./config";
import { getChunkFilename } from "./utils";
import { rollupStub } from "./stub";
import { rollupWatch } from "./watch";
import { fixCJSExportTypePlugin } from "./plugins/cjs";

/**
 * Rollup构建函数
 * @param ctx 构建上下文
 */
export async function rollupBuild(ctx: BuildContext): Promise<void> {
  // Stub模式
  if (ctx.options.stub) {
    await rollupStub(ctx);
    await ctx.hooks.callHook("rollup:done", ctx);
    return;
  }

  // 解析选项
  const rollupOptions = getRollupOptions(ctx);
  await ctx.hooks.callHook("rollup:options", ctx, rollupOptions);

  // 如果没有定义输入条目，则跳过构建
  if (Object.keys(rollupOptions.input as any).length === 0) {
    await ctx.hooks.callHook("rollup:done", ctx);
    return;
  }

  // 执行rollup构建
  const buildResult = await rollup(rollupOptions);
  await ctx.hooks.callHook("rollup:build", ctx, buildResult);

  // 收集输出条目的信息
  const allOutputOptions = rollupOptions.output! as OutputOptions[];
  for (const outputOptions of allOutputOptions) {
    const { output } = await buildResult.write(outputOptions);
    const chunkFileNames = new Set<string>();
    const outputChunks = output.filter(
      (e) => e.type === "chunk",
    ) as OutputChunk[];
    for (const entry of outputChunks) {
      chunkFileNames.add(entry.fileName);
      for (const id of entry.imports) {
        ctx.usedImports.add(id);
      }
      if (entry.isEntry) {
        ctx.buildEntries.push({
          chunks: entry.imports.filter((i) =>
            outputChunks.find((c) => c.fileName === i),
          ),
          modules: Object.entries(entry.modules).map(([id, mod]) => ({
            id,
            bytes: mod.renderedLength,
          })),
          path: entry.fileName,
          bytes: Buffer.byteLength(entry.code, "utf8"),
          exports: entry.exports,
        });
      }
    }
    for (const chunkFileName of chunkFileNames) {
      ctx.usedImports.delete(chunkFileName);
    }
  }

  // 监听模式
  if (ctx.options.watch) {
    rollupWatch(rollupOptions);
    // TODO: 克隆rollup选项以继续类型监听
    if (ctx.options.declaration && ctx.options.watch) {
      consola.warn("`rollup` DTS builder does not support watch mode yet.");
    }
    return;
  }

  // 类型声明
  if (ctx.options.declaration) {
    rollupOptions.plugins = [
      ...rollupOptions.plugins,
      dts(ctx.options.rollup.dts),
      removeShebangPlugin(),
      ctx.options.rollup.emitCJS && fixCJSExportTypePlugin(ctx),
    ].filter(
      (plugin): plugin is NonNullable<Exclude<typeof plugin, false>> =>
        /**
         * 问题: #396
         * rollup-plugin-dts与rollup-plugin-commonjs冲突:
         * https://github.com/Swatinem/rollup-plugin-dts?tab=readme-ov-file#what-to-expect
         */
        !!plugin && (!("name" in plugin) || plugin.name !== "commonjs"),
    );

    await ctx.hooks.callHook("rollup:dts:options", ctx, rollupOptions);
    const typesBuild = await rollup(rollupOptions);
    await ctx.hooks.callHook("rollup:dts:build", ctx, typesBuild);

    // #region cjs
    // 如果启用了CommonJS输出，则生成.d.cts文件
    if (ctx.options.rollup.emitCJS) {
      await typesBuild.write({
        dir: resolve(ctx.options.rootDir, ctx.options.outDir),
        entryFileNames: "[name].d.cts",
        chunkFileNames: (chunk) => getChunkFilename(ctx, chunk, "d.cts"),
      });
    }
    // #endregion

    // #region mjs
    // 生成.d.mts文件
    await typesBuild.write({
      dir: resolve(ctx.options.rootDir, ctx.options.outDir),
      entryFileNames: "[name].d.mts",
      chunkFileNames: (chunk) => getChunkFilename(ctx, chunk, "d.mts"),
    });
    // #endregion

    // #region .d.ts for node10 compatibility (TypeScript version < 4.7)
    // 为node10兼容性生成.d.ts文件（TypeScript版本 < 4.7）
    if (
      ctx.options.declaration === true ||
      ctx.options.declaration === "compatible"
    ) {
      await typesBuild.write({
        dir: resolve(ctx.options.rootDir, ctx.options.outDir),
        entryFileNames: "[name].d.ts",
        chunkFileNames: (chunk) => getChunkFilename(ctx, chunk, "d.ts"),
      });
    }
    // #endregion
  }

  await ctx.hooks.callHook("rollup:done", ctx);
}
