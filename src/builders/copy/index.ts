import { promises as fsp } from "node:fs";
import { relative, resolve } from "pathe";
import { glob } from "tinyglobby";
import { symlink, rmdir, warn } from "../../utils";
import type { CopyBuildEntry, BuildContext } from "../../types";
import consola from "consola";

// 文件复制功能的兼容性处理，优先使用 fsp.cp，如果不可用则使用 fsp.copyFile
const copy = fsp.cp || fsp.copyFile;

/**
 * 执行复制构建任务
 * @param ctx 构建上下文
 */
export async function copyBuild(ctx: BuildContext): Promise<void> {
  // 筛选出构建器为 "copy" 的条目
  const entries = ctx.options.entries.filter(
    (e) => e.builder === "copy",
  ) as CopyBuildEntry[];

  // 调用钩子函数，通知开始处理复制条目
  await ctx.hooks.callHook("copy:entries", ctx, entries);

  // 遍历所有复制条目
  for (const entry of entries) {
    // 获取输出目录
    const distDir = entry.outDir!;

    // 如果是 stub 模式，则创建符号链接而不是复制文件
    if (ctx.options.stub) {
      await rmdir(distDir);
      await symlink(entry.input, distDir);
    } else {
      // 获取文件匹配模式，如果未指定则默认为 "**" (所有文件)
      const patterns = Array.isArray(entry.pattern)
        ? entry.pattern
        : [entry.pattern || "**"];

      // 使用 glob 模式匹配文件
      const paths = await glob(patterns, {
        cwd: resolve(ctx.options.rootDir, entry.input),
        absolute: false,
      });

      // 并行复制所有匹配的文件
      const outputList = await Promise.allSettled(
        paths.map(async (path) => {
          // 解析源文件和目标文件的完整路径
          const src = resolve(ctx.options.rootDir, entry.input, path);
          const dist = resolve(ctx.options.rootDir, distDir, path);
          // 执行文件复制
          await copy(src, dist);
          return dist;
        }),
      );

      // 处理复制过程中出现的错误
      for (const output of outputList) {
        if (output.status === "rejected") {
          warn(ctx, output.reason);
        }
      }

      // 将复制的文件信息添加到构建条目中
      ctx.buildEntries.push({
        path: distDir,
        chunks: outputList
          .filter(({ status }) => status === "fulfilled")
          .map((p) =>
            relative(
              ctx.options.outDir,
              (p as PromiseFulfilledResult<string>).value,
            ),
          ),
      });
    }
  }

  // 调用钩子函数，通知复制任务完成
  await ctx.hooks.callHook("copy:done", ctx);

  // 如果有复制条目且启用了 watch 模式，则发出警告（因为 untyped 构建器不支持 watch 模式）
  if (entries.length > 0 && ctx.options.watch) {
    consola.warn("`untyped` builder does not support watch mode yet.");
  }
}
