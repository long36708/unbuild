import type { OutputOptions, PreRenderedChunk } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import { resolve, isAbsolute } from "pathe";
import { resolveAlias } from "pathe/utils";
import { parseNodeModulePath } from "mlly";
import { arrayIncludes, getpkg, warn } from "../../utils";
import type { BuildContext, RollupOptions } from "../../types";
import { esbuild } from "./plugins/esbuild";
import { JSONPlugin } from "./plugins/json";
import { rawPlugin } from "./plugins/raw";
import { cjsPlugin } from "./plugins/cjs";
import { shebangPlugin } from "./plugins/shebang";
import { DEFAULT_EXTENSIONS, getChunkFilename, resolveAliases } from "./utils";

/**
 * 获取Rollup选项
 * @param ctx 构建上下文
 * @returns Rollup选项
 */
export function getRollupOptions(ctx: BuildContext): RollupOptions {
  // 解析别名
  const _aliases = resolveAliases(ctx);

  return {
    // 输入配置
    input: Object.fromEntries(
      ctx.options.entries
        .filter((entry) => entry.builder === "rollup")
        .map((entry) => [
          entry.name,
          resolve(ctx.options.rootDir, entry.input),
        ]),
    ),

    // 输出配置
    output: [
      // CommonJS输出
      ctx.options.rollup.emitCJS &&
        ({
          dir: resolve(ctx.options.rootDir, ctx.options.outDir),
          entryFileNames: "[name].cjs",
          chunkFileNames: (chunk: PreRenderedChunk) =>
            getChunkFilename(ctx, chunk, "cjs"),
          format: "cjs",
          exports: "auto",
          interop: "compat",
          generatedCode: { constBindings: true },
          externalLiveBindings: false,
          freeze: false,
          sourcemap: ctx.options.sourcemap,
          ...ctx.options.rollup.output,
        } satisfies OutputOptions),

      // ES模块输出
      {
        dir: resolve(ctx.options.rootDir, ctx.options.outDir),
        entryFileNames: "[name].mjs",
        chunkFileNames: (chunk: PreRenderedChunk) =>
          getChunkFilename(ctx, chunk, "mjs"),
        format: "esm",
        exports: "auto",
        generatedCode: { constBindings: true },
        externalLiveBindings: false,
        freeze: false,
        sourcemap: ctx.options.sourcemap,
        ...ctx.options.rollup.output,
      } satisfies OutputOptions,
    ].filter(Boolean) as OutputOptions[],

    /**
     * 判断模块是否为外部依赖
     * @param originalId 原始模块ID
     * @returns 是否为外部依赖
     */
    external(originalId): boolean {
      // 解析别名
      const resolvedId = resolveAlias(originalId, _aliases);

      // 尝试猜测ID的包名
      const pkgName =
        parseNodeModulePath(resolvedId)?.name ||
        parseNodeModulePath(originalId)?.name ||
        getpkg(originalId);

      // 检查显式的外部规则
      if (
        arrayIncludes(ctx.options.externals, pkgName) ||
        arrayIncludes(ctx.options.externals, originalId) ||
        arrayIncludes(ctx.options.externals, resolvedId)
      ) {
        return true;
      }

      // 源代码总是被打包
      for (const id of [originalId, resolvedId]) {
        if (
          id[0] === "." ||
          isAbsolute(id) ||
          /src[/\\]/.test(id) ||
          id.startsWith(ctx.pkg.name!)
        ) {
          return false;
        }
      }

      // 检查其他显式的内联规则
      if (
        ctx.options.rollup.inlineDependencies === true ||
        (Array.isArray(ctx.options.rollup.inlineDependencies) &&
          (arrayIncludes(ctx.options.rollup.inlineDependencies, pkgName) ||
            arrayIncludes(ctx.options.rollup.inlineDependencies, originalId) ||
            arrayIncludes(ctx.options.rollup.inlineDependencies, resolvedId)))
      ) {
        return false;
      }

      // 默认内联，但显示警告，因为这是一个隐式行为
      warn(ctx, `Implicitly bundling "${originalId}"`);
      return false;
    },

    /**
     * 处理Rollup警告
     * @param warning 警告信息
     * @param rollupWarn Rollup警告函数
     */
    onwarn(warning, rollupWarn): void {
      // 忽略循环依赖警告
      if (!warning.code || !["CIRCULAR_DEPENDENCY"].includes(warning.code)) {
        rollupWarn(warning);
      }
    },

    // 插件配置
    plugins: [
      // 替换插件
      ctx.options.rollup.replace &&
        replace({
          ...ctx.options.rollup.replace,
          values: {
            ...ctx.options.replace,
            ...ctx.options.rollup.replace.values,
          },
        }),

      // 别名插件
      ctx.options.rollup.alias &&
        alias({
          ...ctx.options.rollup.alias,
          entries: _aliases,
        }),

      // 解析插件
      ctx.options.rollup.resolve &&
        nodeResolve({
          extensions: DEFAULT_EXTENSIONS,
          exportConditions: ["production"],
          ...ctx.options.rollup.resolve,
        }),

      // JSON插件
      ctx.options.rollup.json &&
        JSONPlugin({
          ...ctx.options.rollup.json,
        }),

      // Shebang插件
      shebangPlugin(),

      // ESBuild插件
      ctx.options.rollup.esbuild &&
        esbuild({
          sourcemap: ctx.options.sourcemap,
          ...ctx.options.rollup.esbuild,
        }),

      // CommonJS插件
      ctx.options.rollup.commonjs &&
        commonjs({
          extensions: DEFAULT_EXTENSIONS,
          ...ctx.options.rollup.commonjs,
        }),

      // 保留动态导入插件
      ctx.options.rollup.preserveDynamicImports && {
        name: "unbuild=preserve-dynamic-imports",
        renderDynamicImport(): { left: string; right: string } {
          return { left: "import(", right: ")" };
        },
      },

      // CommonJS桥接插件
      ctx.options.rollup.cjsBridge && cjsPlugin({}),

      // 原始文件插件
      rawPlugin(),
    ].filter((p): p is NonNullable<Exclude<typeof p, false>> => !!p),
  } satisfies RollupOptions;
}
