import type { MkdistOptions } from "mkdist";
import type { BuildContext, BaseBuildEntry } from "../../types";

// 基础构建条目与Mkdist选项的联合类型
type _BaseAndMkdist = BaseBuildEntry & MkdistOptions;

/**
 * Mkdist构建条目接口
 * 继承自基础构建条目和Mkdist选项
 */
export interface MkdistBuildEntry extends _BaseAndMkdist {
  /**
   * 构建器类型，固定为"mkdist"
   */
  builder: "mkdist";
}

/**
 * Mkdist钩子接口
 */
export interface MkdistHooks {
  /**
   * 处理mkdist条目前调用的钩子函数
   * @param ctx 构建上下文
   * @param entries mkdist构建条目数组
   */
  "mkdist:entries": (
    ctx: BuildContext,
    entries: MkdistBuildEntry[],
  ) => void | Promise<void>;

  /**
   * 处理mkdist条目选项时调用的钩子函数
   * @param ctx 构建上下文
   * @param entry mkdist构建条目
   * @param options mkdist选项
   */
  "mkdist:entry:options": (
    ctx: BuildContext,
    entry: MkdistBuildEntry,
    options: MkdistOptions,
  ) => void | Promise<void>;

  /**
   * mkdist条目构建完成后调用的钩子函数
   * @param ctx 构建上下文
   * @param entry mkdist构建条目
   * @param output 构建输出结果，包含写入的文件列表
   */
  "mkdist:entry:build": (
    ctx: BuildContext,
    entry: MkdistBuildEntry,
    output: { writtenFiles: string[] },
  ) => void | Promise<void>;

  /**
   * mkdist构建完成后调用的钩子函数
   * @param ctx 构建上下文
   */
  "mkdist:done": (ctx: BuildContext) => void | Promise<void>;
}
