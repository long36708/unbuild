import type { BaseBuildEntry, BuildContext } from "../../types";

/**
 * 复制构建条目接口
 * 扩展自基础构建条目，专门用于复制操作
 */
export interface CopyBuildEntry extends BaseBuildEntry {
  /**
   * 构建器类型，固定为 "copy"
   */
  builder: "copy";

  /**
   * 文件匹配模式，可以是字符串或字符串数组
   * 用于指定哪些文件需要被复制
   */
  pattern?: string | string[];
}

/**
 * 复制相关的钩子函数接口
 */
export interface CopyHooks {
  /**
   * 在处理复制条目前调用的钩子函数
   * @param ctx 构建上下文
   * @param entries 复制构建条目数组
   */
  "copy:entries": (
    ctx: BuildContext,
    entries: CopyBuildEntry[],
  ) => void | Promise<void>;

  /**
   * 在复制操作完成后调用的钩子函数
   * @param ctx 构建上下文
   */
  "copy:done": (ctx: BuildContext) => void | Promise<void>;
}
