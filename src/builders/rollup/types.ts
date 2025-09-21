import type {
  RollupOptions as _RollupOptions,
  RollupBuild,
  OutputOptions,
  InputPluginOption,
  Plugin,
} from "rollup";
import type { RollupReplaceOptions } from "@rollup/plugin-replace";
import type { RollupAliasOptions } from "@rollup/plugin-alias";
import type { RollupNodeResolveOptions } from "@rollup/plugin-node-resolve";
import type { RollupJsonOptions } from "@rollup/plugin-json";
import type { Options as RollupDtsOptions } from "rollup-plugin-dts";
import type commonjs from "@rollup/plugin-commonjs";
import type { BaseBuildEntry } from "../../types";
import type { BuildContext } from "../../types";
import type { EsbuildOptions } from "./plugins/esbuild";

/**
 * Rollup CommonJS选项类型
 */
export type RollupCommonJSOptions = Parameters<typeof commonjs>[0] & {};

/**
 * Rollup构建条目接口
 * 继承自基础构建条目
 */
export interface RollupBuildEntry extends BaseBuildEntry {
  /**
   * 构建器类型，固定为"rollup"
   */
  builder: "rollup";
}

/**
 * Rollup构建选项接口
 */
export interface RollupBuildOptions {
  /**
   * 如果启用，unbuild除了生成ESM构建外，还会生成CommonJS构建
   */
  emitCJS?: boolean;

  /**
   * 启用实验性主动监听器
   *
   * @experimental
   */
  watch?: boolean;

  /**
   * 如果启用，unbuild会为ESM构建生成CommonJS polyfills
   */
  cjsBridge?: boolean;

  /**
   * 保持动态导入不变
   */
  preserveDynamicImports?: boolean;

  /**
   * 是否内联未在"dependencies"或"peerDependencies"中明确设置或标记为外部依赖的依赖项
   *
   * 如果设置为true，所有此类依赖项都将被内联
   * 如果传递字符串或正则表达式的数组，这些将用于确定是否内联此类依赖项
   */
  inlineDependencies?: boolean | Array<string | RegExp>;

  /**
   * Rollup [输出选项](https://rollupjs.org/configuration-options)
   */
  output?: OutputOptions;

  /**
   * 替换插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [@rollup/plugin-replace](https://www.npmjs.com/package/@rollup/plugin-replace)
   */
  replace: RollupReplaceOptions | false;

  /**
   * 别名插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [@rollup/plugin-alias](https://www.npmjs.com/package/@rollup/plugin-alias)
   */
  alias: RollupAliasOptions | false;

  /**
   * 解析插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)
   */
  resolve: RollupNodeResolveOptions | false;

  /**
   * JSON插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [@rollup/plugin-json](https://www.npmjs.com/package/@rollup/plugin-json)
   */
  json: RollupJsonOptions | false;

  /**
   * ESBuild插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [esbuild](https://www.npmjs.com/package/esbuild)
   */
  esbuild: EsbuildOptions | false;

  /**
   * CommonJS插件选项
   * 设置为`false`以禁用插件
   * 了解更多: [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)
   */
  commonjs: RollupCommonJSOptions | false;

  /**
   * DTS插件选项
   * 了解更多: [rollup-plugin-dts](https://www.npmjs.com/package/rollup-plugin-dts)
   */
  dts: RollupDtsOptions;
}

/**
 * Rollup选项接口
 * 继承自Rollup选项
 */
export interface RollupOptions extends _RollupOptions {
  /**
   * 插件数组
   */
  plugins: Plugin[];
}

/**
 * Rollup钩子接口
 */
export interface RollupHooks {
  /**
   * 处理Rollup选项时调用的钩子函数
   * @param ctx 构建上下文
   * @param options Rollup选项
   */
  "rollup:options": (
    ctx: BuildContext,
    options: RollupOptions,
  ) => void | Promise<void>;

  /**
   * Rollup构建完成后调用的钩子函数
   * @param ctx 构建上下文
   * @param build Rollup构建对象
   */
  "rollup:build": (
    ctx: BuildContext,
    build: RollupBuild,
  ) => void | Promise<void>;

  /**
   * 处理DTS选项时调用的钩子函数
   * @param ctx 构建上下文
   * @param options Rollup选项
   */
  "rollup:dts:options": (
    ctx: BuildContext,
    options: RollupOptions,
  ) => void | Promise<void>;

  /**
   * DTS构建完成后调用的钩子函数
   * @param ctx 构建上下文
   * @param build Rollup构建对象
   */
  "rollup:dts:build": (
    ctx: BuildContext,
    build: RollupBuild,
  ) => void | Promise<void>;

  /**
   * Rollup构建完成后调用的钩子函数
   * @param ctx 构建上下文
   */
  "rollup:done": (ctx: BuildContext) => void | Promise<void>;
}
