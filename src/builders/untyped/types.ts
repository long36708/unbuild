import type { Schema } from "untyped";
import type { BaseBuildEntry, BuildContext } from "../../types";

/**
 * Untyped构建条目接口
 * 继承自基础构建条目
 */
export interface UntypedBuildEntry extends BaseBuildEntry {
  /**
   * 构建器类型，固定为"untyped"
   */
  builder: "untyped";

  /**
   * 默认值
   */
  defaults?: Record<string, any>;
}

/**
 * Untyped输出接口
 */
export interface UntypedOutput {
  /**
   * 文件名
   */
  fileName: string;

  /**
   * 内容
   */
  contents: string;
}

/**
 * Untyped输出集合接口
 */
export interface UntypedOutputs {
  /**
   * Markdown输出
   */
  markdown: UntypedOutput;

  /**
   * 模式输出
   */
  schema: UntypedOutput;

  /**
   * 默认值输出
   */
  defaults: UntypedOutput;

  /**
   * 声明输出（可选）
   */
  declaration?: UntypedOutput;
}

/**
 * Untyped钩子接口
 */
export interface UntypedHooks {
  /**
   * 处理untyped条目前调用的钩子函数
   * @param ctx 构建上下文
   * @param entries untyped构建条目数组
   */
  "untyped:entries": (
    ctx: BuildContext,
    entries: UntypedBuildEntry[],
  ) => void | Promise<void>;

  /**
   * 处理untyped条目选项时调用的钩子函数
   * @param ctx 构建上下文
   * @param entry untyped构建条目
   * @param options 选项
   */
  "untyped:entry:options": (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    options: any,
  ) => void | Promise<void>;

  /**
   * 处理untyped条目模式时调用的钩子函数
   * @param ctx 构建上下文
   * @param entry untyped构建条目
   * @param schema 模式
   */
  "untyped:entry:schema": (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    schema: Schema,
  ) => void | Promise<void>;

  /**
   * 处理untyped条目输出时调用的钩子函数
   * @param ctx 构建上下文
   * @param entry untyped构建条目
   * @param outputs 输出集合
   */
  "untyped:entry:outputs": (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    outputs: UntypedOutputs,
  ) => void | Promise<void>;

  /**
   * untyped构建完成后调用的钩子函数
   * @param ctx 构建上下文
   */
  "untyped:done": (ctx: BuildContext) => void | Promise<void>;
}
