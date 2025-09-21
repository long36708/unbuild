import { relative } from "pathe";
import { mkdist, type MkdistOptions } from "mkdist";
import { symlink, rmdir, warn } from "../../utils";
import type { MkdistBuildEntry, BuildContext } from "../../types";
import consola from "consola";

/**
 * mkdist构建函数
 * @param ctx 构建上下文
 */
export async function mkdistBuild(ctx: BuildContext): Promise<void> {
  // 筛选出构建器为"mkdist"的条目
  const entries = ctx.options.entries.filter(
    (e) => e.builder === "mkdist",
  ) as MkdistBuildEntry[];

  // 调用钩子函数，通知开始处理mkdist条目
  await ctx.hooks.callHook("mkdist:entries", ctx, entries);

  // 遍历所有mkdist条目
  for (const entry of entries) {
    // 获取输出目录
    const distDir = entry.outDir!;

    // 如果是stub模式，则创建符号链接
    if (ctx.options.stub) {
      await rmdir(distDir);
      await symlink(entry.input, distDir);
    } else {
      // 构建mkdist选项
      const mkdistOptions: MkdistOptions = {
        rootDir: ctx.options.rootDir,
        srcDir: entry.input,
        distDir,
        cleanDist: false,
        ...entry,
      };

      // 调用钩子函数，允许修改mkdist选项
      await ctx.hooks.callHook(
        "mkdist:entry:options",
        ctx,
        entry,
        mkdistOptions,
      );

      // 执行mkdist构建
      const output = await mkdist(mkdistOptions);

      // 将构建结果添加到构建条目中
      ctx.buildEntries.push({
        path: distDir,
        chunks: output.writtenFiles.map((p) => relative(ctx.options.outDir, p)),
      });

      // 调用钩子函数，通知条目构建完成
      await ctx.hooks.callHook("mkdist:entry:build", ctx, entry, output);

      // 处理构建错误
      if (output.errors) {
        for (const error of output.errors) {
          warn(
            ctx,
            `mkdist build failed for \`${relative(ctx.options.rootDir, error.filename)}\`:\n${error.errors.map((e) => `  - ${e}`).join("\n")}`,
          );
        }
      }
    }
  }

  // 调用钩子函数，通知mkdist构建完成
  await ctx.hooks.callHook("mkdist:done", ctx);

  // 如果有条目且启用了watch模式，则发出警告
  if (entries.length > 0 && ctx.options.watch) {
    consola.warn("`mkdist` builder does not support watch mode yet.");
  }
}
