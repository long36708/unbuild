import type { Plugin } from "rollup";
import { findStaticImports } from "mlly";
import MagicString from "magic-string";
import type { BuildContext } from "../../../types.ts";
import { FixDtsDefaultCjsExportsPlugin } from "fix-dts-default-cjs-exports/rollup";

/**
 * CommonJS插件
 * @param _opts 插件选项
 * @returns Rollup插件
 */
export function cjsPlugin(_opts?: any): Plugin {
  return {
    name: "unbuild-cjs",
    renderChunk(code, _chunk, opts) {
      // 如果格式为ES，则将CommonJS转换为ESM
      if (opts.format === "es") {
        return CJSToESM(code);
      }
      return null;
    },
  } as Plugin;
}

/**
 * 修复CJS导出类型插件
 * @param ctx 构建上下文
 * @returns Rollup插件
 */
export function fixCJSExportTypePlugin(ctx: BuildContext): Plugin {
  // 正则表达式，用于匹配声明文件
  const regexp =
    ctx.options.declaration === "node16"
      ? /\.d\.cts$/ // 仅匹配d.cts文件
      : /\.d\.c?ts$/; // 匹配d.ts和d.cts文件
  return FixDtsDefaultCjsExportsPlugin({
    // 警告函数
    warn: (msg) => ctx.warnings.add(msg),
    // 匹配函数
    matcher: (info) => {
      return (
        info.type === "chunk" &&
        info.exports?.length > 0 &&
        info.exports.includes("default") &&
        regexp.test(info.fileName) &&
        info.isEntry
      );
    },
  });
}

// CommonJS语法正则表达式
const CJSyntaxRe = /__filename|__dirname|require\(|require\.resolve\(/;

// CommonJS垫片代码
const CJSShim = `

// -- Unbuild CommonJS Shims --
import __cjs_url__ from 'url';
import __cjs_path__ from 'path';
import __cjs_mod__ from 'module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require = __cjs_mod__.createRequire(import.meta.url);
`;

/**
 * 将CommonJS转换为ESM
 * @param code 代码
 * @returns 转换后的代码和源映射
 */
// Shim __dirname, __filename and require
function CJSToESM(code: string): { code: string; map: any } | null {
  // 如果代码已包含垫片或不包含CommonJS语法，则直接返回
  if (code.includes(CJSShim) || !CJSyntaxRe.test(code)) {
    return null;
  }

  // 查找最后一个ESM导入
  const lastESMImport = findStaticImports(code).pop();
  // 获取要追加的索引
  const indexToAppend = lastESMImport ? lastESMImport.end : 0;
  // 创建MagicString实例
  const s = new MagicString(code);
  // 在指定位置追加垫片代码
  s.appendRight(indexToAppend, CJSShim);

  // 返回转换后的代码和源映射
  return {
    code: s.toString(),
    map: s.generateMap(),
  };
}
