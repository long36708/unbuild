import type { PreRenderedChunk } from "rollup";
import type { BuildContext } from "../../types";

/**
 * 默认文件扩展名数组
 */
export const DEFAULT_EXTENSIONS: string[] = [
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".mjs",
  ".cjs",
  ".js",
  ".jsx",
  ".json",
];

/**
 * 解析别名
 * @param ctx 构建上下文
 * @returns 别名字典
 */
export function resolveAliases(ctx: BuildContext): Record<string, string> {
  // 初始化别名字典
  const aliases: Record<string, string> = {
    [ctx.pkg.name!]: ctx.options.rootDir,
    ...ctx.options.alias,
  };

  // 如果Rollup别名选项存在
  if (ctx.options.rollup.alias) {
    // 如果别名条目是数组
    if (Array.isArray(ctx.options.rollup.alias.entries)) {
      Object.assign(
        aliases,
        Object.fromEntries(
          ctx.options.rollup.alias.entries.map((entry) => {
            return [entry.find, entry.replacement];
          }),
        ),
      );
    } else {
      // 如果别名条目不是数组
      Object.assign(
        aliases,
        ctx.options.rollup.alias.entries || ctx.options.rollup.alias,
      );
    }
  }

  return aliases;
}

/**
 * 获取chunk文件名
 * @param ctx 构建上下文
 * @param chunk 预渲染chunk
 * @param ext 文件扩展名
 * @returns chunk文件名
 */
export function getChunkFilename(
  ctx: BuildContext,
  chunk: PreRenderedChunk,
  ext: string,
): string {
  // 如果是动态入口
  if (chunk.isDynamicEntry) {
    return `chunks/[name].${ext}`;
  }
  // TODO: Find a way to generate human friendly hash for short groups
  // 返回共享chunk文件名
  return `shared/${ctx.options.name}.[hash].${ext}`;
}
