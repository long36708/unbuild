import { createFilter } from "@rollup/pluginutils";
import type { FilterPattern } from "@rollup/pluginutils";
import type { Plugin } from "rollup";

/**
 * 原始加载器选项接口
 */
export interface RawLoaderOptions {
  /**
   * 包含模式
   */
  include?: FilterPattern;

  /**
   * 排除模式
   */
  exclude?: FilterPattern;
}

/**
 * 默认选项
 */
const defaults: RawLoaderOptions = {
  include: [/\.(md|txt|css|htm|html)$/],
  exclude: [],
};

/**
 * 原始插件
 * @param opts 原始加载器选项
 * @returns Rollup插件
 */
export function rawPlugin(opts: RawLoaderOptions = {}): Plugin {
  // 合并选项
  opts = { ...opts, ...defaults };
  // 创建过滤器
  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "unbuild-raw",
    transform(code, id): { code: string; map: any } | undefined {
      // 如果匹配过滤器
      if (filter(id)) {
        // 返回导出默认代码
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        };
      }
    },
  };
}
