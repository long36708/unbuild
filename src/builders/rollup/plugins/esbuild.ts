// 基于 https://github.com/egoist/rollup-plugin-esbuild 和 nitropack fork (MIT)
import type { Plugin, PluginContext } from "rollup";
import type { FilterPattern } from "@rollup/pluginutils";
import type { Loader, TransformResult, CommonOptions } from "esbuild";
import { transform } from "esbuild";
import { extname, relative } from "pathe";
import { createFilter } from "@rollup/pluginutils";

/**
 * 默认加载器映射
 */
const DefaultLoaders: { [ext: string]: Loader } = {
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",

  ".ts": "ts",
  ".mts": "ts",
  ".cts": "ts",

  ".tsx": "tsx",
  ".jsx": "jsx",
};

/**
 * Esbuild选项类型
 */
export type EsbuildOptions = CommonOptions & {
  /**
   * 包含模式
   */
  include?: FilterPattern;

  /**
   * 排除模式
   */
  exclude?: FilterPattern;

  /**
   * 将扩展名映射到esbuild加载器
   * 注意每个条目（扩展名）需要以点开头
   */
  loaders?: {
    [ext: string]: Loader | false;
  };
};

/**
 * Esbuild插件
 * @param options Esbuild选项
 * @returns Rollup插件
 */
export function esbuild(options: EsbuildOptions): Plugin {
  // 从附加选项中提取esBuild选项并应用默认值
  const {
    include = new RegExp(Object.keys(DefaultLoaders).join("|")),
    exclude = /node_modules/,
    loaders: loaderOptions,
    ...esbuildOptions
  } = options;

  // 解析加载器
  const loaders = { ...DefaultLoaders };
  if (loaderOptions) {
    for (const [key, value] of Object.entries(loaderOptions)) {
      if (typeof value === "string") {
        loaders[key] = value;
      } else if (value === false) {
        delete loaders[key];
      }
    }
  }

  /**
   * 获取加载器
   * @param id 文件ID
   * @returns 加载器
   */
  const getLoader = (id = ""): Loader | undefined => {
    return loaders[extname(id)];
  };

  // 创建过滤器
  const filter = createFilter(include, exclude);

  return {
    name: "esbuild",

    /**
     * 转换代码
     * @param code 代码
     * @param id 文件ID
     * @returns 转换后的代码和源映射
     */
    async transform(code, id): Promise<null | { code: string; map: any }> {
      // 如果不匹配过滤器，则返回null
      if (!filter(id)) {
        return null;
      }

      // 获取加载器
      const loader = getLoader(id);
      // 如果没有加载器，则返回null
      if (!loader) {
        return null;
      }

      // 转换代码
      const result = await transform(code, {
        ...esbuildOptions,
        loader,
        sourcefile: id,
      });

      // 打印警告
      printWarnings(id, result, this);

      // 返回转换后的代码和源映射
      return {
        code: result.code || "",
        map: result.map || null,
      };
    },

    /**
     * 渲染chunk
     * @param code 代码
     * @param fileName 文件名
     * @returns 渲染后的代码和源映射
     */
    async renderChunk(
      code,
      { fileName },
    ): Promise<null | undefined | { code: string; map: any }> {
      // 如果没有启用压缩，则返回null
      if (!options.minify) {
        return null;
      }
      // 如果是声明文件，则返回null
      if (/\.d\.(c|m)?tsx?$/.test(fileName)) {
        return null;
      }
      // 获取加载器
      const loader = getLoader(fileName);
      // 如果没有加载器，则返回null
      if (!loader) {
        return null;
      }
      // 转换代码
      const result = await transform(code, {
        ...esbuildOptions,
        loader,
        sourcefile: fileName,
        minify: true,
      });
      // 返回转换后的代码和源映射
      return {
        code: result.code || "",
        map: result.map || null,
      };
    },
  };
}

/**
 * 打印警告
 * @param id 文件ID
 * @param result 转换结果
 * @param plugin 插件上下文
 */
function printWarnings(
  id: string,
  result: TransformResult,
  plugin: PluginContext,
): void {
  // 如果有警告，则打印警告
  if (result.warnings) {
    for (const warning of result.warnings) {
      let message = "[esbuild]";
      // 如果有位置信息，则添加位置信息
      if (warning.location) {
        message += ` (${relative(process.cwd(), id)}:${warning.location.line}:${
          warning.location.column
        })`;
      }
      // 添加警告文本
      message += ` ${warning.text}`;
      // 打印警告
      plugin.warn(message);
    }
  }
}
