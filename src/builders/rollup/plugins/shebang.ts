import { promises as fsp } from "node:fs";
import { resolve } from "pathe";
import type { Plugin } from "rollup";

// 派生自 https://github.com/developit/rollup-plugin-preserve-shebang (1.0.1 @ MIT)

// Shebang正则表达式
const SHEBANG_RE = /^#![^\n]*/;

/**
 * Shebang插件
 * @returns Rollup插件
 */
export function shebangPlugin(): Plugin {
  return {
    name: "unbuild-shebang",
    async writeBundle(options, bundle): Promise<void> {
      // 遍历所有输出文件
      for (const [fileName, output] of Object.entries(bundle)) {
        // 如果不是chunk类型，则跳过
        if (output.type !== "chunk") {
          continue;
        }
        // 如果代码匹配Shebang正则表达式
        if (output.code?.match(SHEBANG_RE)) {
          // 获取输出文件路径
          const outFile = resolve(options.dir!, fileName);
          // 使文件可执行
          await makeExecutable(outFile);
        }
      }
    },
  };
}

/**
 * 移除Shebang插件
 * @returns Rollup插件
 */
export function removeShebangPlugin(): Plugin {
  return {
    name: "unbuild-remove-shebang",
    renderChunk(code): string {
      // 移除Shebang
      return code.replace(SHEBANG_RE, "");
    },
  };
}

/**
 * 使文件可执行
 * @param filePath 文件路径
 */
export async function makeExecutable(filePath: string): Promise<void> {
  // 修改文件权限为可执行
  await fsp.chmod(filePath, 0o755 /* rwx r-x r-x */).catch(() => {});
}

/**
 * 获取Shebang
 * @param code 代码
 * @param append 追加内容
 * @returns Shebang
 */
export function getShebang(code: string, append = "\n"): string {
  // 匹配Shebang
  const m = code.match(SHEBANG_RE);
  // 如果匹配到，则返回Shebang和追加内容，否则返回空字符串
  return m ? m + append : "";
}
