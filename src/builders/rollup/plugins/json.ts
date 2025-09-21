import type { Plugin, TransformHook, TransformResult } from "rollup";
import type { RollupJsonOptions } from "@rollup/plugin-json";
import rollupJSONPlugin from "@rollup/plugin-json";

// 导出默认前缀
const EXPORT_DEFAULT = "export default ";

/**
 * JSON插件
 * @param options Rollup JSON选项
 * @returns Rollup插件
 */
export function JSONPlugin(options: RollupJsonOptions): Plugin {
  // 创建Rollup JSON插件实例
  const plugin = rollupJSONPlugin(options);
  return {
    ...plugin,
    name: "unbuild-json",
    transform(code, id): TransformResult {
      // 调用原始插件的transform方法
      const res = (plugin.transform as TransformHook)!.call(this, code, id);
      // 如果结果存在且为对象且包含code属性且以export default开头
      if (
        res &&
        typeof res !== "string" &&
        "code" in res &&
        res.code &&
        res.code.startsWith(EXPORT_DEFAULT)
      ) {
        // 将export default替换为module.exports =
        res.code = res.code.replace(EXPORT_DEFAULT, "module.exports = ");
      }
      // 返回结果
      return res;
    },
  } satisfies Plugin;
}
