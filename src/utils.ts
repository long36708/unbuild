import fsp from "node:fs/promises";
import { readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "pathe";
import { createJiti } from "jiti";
import { consola } from "consola";
import type { PackageJson } from "pkg-types";
import { autoPreset } from "./auto";
import type { BuildPreset, BuildConfig, BuildContext } from "./types";

/**
 * 确保目录存在，如果不存在则创建
 * @param path 路径
 */
export async function ensuredir(path: string): Promise<void> {
  await fsp.mkdir(dirname(path), { recursive: true });
}

/**
 * 添加警告信息到构建上下文
 * @param ctx 构建上下文
 * @param message 警告信息
 */
export function warn(ctx: BuildContext, message: string): void {
  // 如果警告信息已存在，则直接返回
  if (ctx.warnings.has(message)) {
    return;
  }
  // 记录警告信息到控制台
  consola.debug("[unbuild] [warn]", message);
  // 将警告信息添加到构建上下文的警告集合中
  ctx.warnings.add(message);
}

/**
 * 创建符号链接
 * @param from 源路径
 * @param to 目标路径
 * @param force 是否强制创建（如果目标已存在则先删除）
 */
export async function symlink(
  from: string,
  to: string,
  force = true,
): Promise<void> {
  // 确保目标目录存在
  await ensuredir(to);
  // 如果强制创建且目标已存在，则先删除
  if (force) {
    await fsp.unlink(to).catch(() => {});
  }
  // 创建符号链接
  await fsp.symlink(from, to, "junction");
}

/**
 * 将对象转为字符串表示
 * @param obj 对象
 * @returns 对象的字符串表示
 */
export function dumpObject(obj: Record<string, any>): string {
  return (
    "{ " +
    Object.keys(obj)
      .map((key) => `${key}: ${JSON.stringify(obj[key])}`)
      .join(", ") +
    " }"
  );
}

/**
 * 从模块ID获取包名
 * @param id 模块ID
 * @returns 包名
 */
export function getpkg(id = ""): string {
  const s = id.split("/");
  // 处理作用域包（如 @scope/package）
  return s[0][0] === "@" ? `${s[0]}/${s[1]}` : s[0];
}

/**
 * 删除目录及其内容
 * @param dir 目录路径
 */
export async function rmdir(dir: string): Promise<void> {
  // 尝试删除目录（如果存在）
  await fsp.unlink(dir).catch(() => {});
  // 递归删除目录及其内容
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
}

/**
 * 递归列出目录中的所有文件
 * @param path 目录路径
 * @returns 文件路径数组
 */
export function listRecursively(path: string): string[] {
  const filenames = new Set<string>();

  // 递归遍历目录的内部函数
  const walk = (path: string): void => {
    const files = readdirSync(path);
    for (const file of files) {
      const fullPath = resolve(path, file);
      if (statSync(fullPath).isDirectory()) {
        // 如果是目录，则添加目录路径并递归遍历
        filenames.add(fullPath + "/");
        walk(fullPath);
      } else {
        // 如果是文件，则添加文件路径
        filenames.add(fullPath);
      }
    }
  };

  walk(path);
  return [...filenames];
}

/**
 * 解析构建预设
 * @param preset 预设名称或预设对象
 * @param rootDir 项目根目录
 * @returns 构建配置
 */
export async function resolvePreset(
  preset: string | BuildPreset,
  rootDir: string,
): Promise<BuildConfig> {
  // 如果是"auto"预设，则使用自动预设
  if (preset === "auto") {
    preset = autoPreset;
  }
  // 如果是字符串预设，则尝试导入
  else if (typeof preset === "string") {
    preset =
      (await createJiti(rootDir, { interopDefault: true }).import(preset, {
        default: true,
      })) || {};
  }
  // 如果是函数预设，则执行函数
  if (typeof preset === "function") {
    preset = preset();
  }
  return preset as BuildConfig;
}

/**
 * 推断导出类型（ESM或CJS）
 * @param condition 条件
 * @param previousConditions 之前的条件数组
 * @param filename 文件名
 * @returns 导出类型（"esm"或"cjs"）
 */
export function inferExportType(
  condition: string,
  previousConditions: string[] = [],
  filename = "",
): "esm" | "cjs" {
  // 根据文件扩展名推断类型
  if (filename) {
    if (filename.endsWith(".d.ts")) {
      return "esm";
    }
    if (filename.endsWith(".mjs")) {
      return "esm";
    }
    if (filename.endsWith(".cjs")) {
      return "cjs";
    }
  }

  // 根据条件推断类型
  switch (condition) {
    case "import": {
      return "esm";
    }
    case "require": {
      return "cjs";
    }
    default: {
      // 如果没有之前的条件，则默认为ESM
      if (previousConditions.length === 0) {
        // TODO: Check against type:module for default
        return "esm";
      }
      // 递归处理之前的条件
      const [newCondition, ...rest] = previousConditions;
      return inferExportType(newCondition, rest, filename);
    }
  }
}

/**
 * 输出描述符类型
 */
export type OutputDescriptor = { file: string; type?: "esm" | "cjs" };

/**
 * 提取导出文件名
 * @param exports package.json中的exports字段
 * @param conditions 条件数组
 * @returns 输出描述符数组
 */
export function extractExportFilenames(
  exports: PackageJson["exports"],
  conditions: string[] = [],
): OutputDescriptor[] {
  // 如果没有exports，则返回空数组
  if (!exports) {
    return [];
  }
  // 如果exports是字符串，则返回单个输出描述符
  if (typeof exports === "string") {
    return [{ file: exports, type: "esm" }];
  }
  // 递归处理exports对象
  return (
    Object.entries(exports)
      // 过滤掉.json子路径（如package.json）
      .filter(([subpath]) => !subpath.endsWith(".json"))
      .flatMap(([condition, exports]) =>
        typeof exports === "string"
          ? {
              file: exports,
              type: inferExportType(condition, conditions, exports),
            }
          : extractExportFilenames(exports, [...conditions, condition]),
      )
  );
}

/**
 * 检查数组是否包含指定元素
 * @param arr 数组
 * @param searchElement 要搜索的元素
 * @returns 是否包含指定元素
 */
export function arrayIncludes(
  arr: (string | RegExp)[],
  searchElement: string,
): boolean {
  return arr.some((entry) =>
    entry instanceof RegExp
      ? entry.test(searchElement)
      : entry === searchElement,
  );
}

/**
 * 移除文件扩展名
 * @param filename 文件名
 * @returns 移除扩展名后的文件名
 */
export function removeExtension(filename: string): string {
  return filename.replace(/\.(js|mjs|cjs|ts|mts|cts|json|jsx|tsx)$/, "");
}

/**
 * 推断包的外部依赖
 * @param pkg package.json内容
 * @returns 外部依赖数组
 */
export function inferPkgExternals(pkg: PackageJson): (string | RegExp)[] {
  // 收集各种类型的依赖
  const externals: (string | RegExp)[] = [
    // dependencies
    ...Object.keys(pkg.dependencies || {}),
    // peerDependencies
    ...Object.keys(pkg.peerDependencies || {}),
    // devDependencies中的@types包
    ...Object.keys(pkg.devDependencies || {}).filter((dep) =>
      dep.startsWith("@types/"),
    ),
    // optionalDependencies
    ...Object.keys(pkg.optionalDependencies || {}),
  ];

  // 如果有包名，则添加到外部依赖中
  if (pkg.name) {
    externals.push(pkg.name);
    // 处理exports字段中的子路径
    if (pkg.exports) {
      for (const subpath of Object.keys(pkg.exports)) {
        if (subpath.startsWith("./")) {
          externals.push(pathToRegex(`${pkg.name}/${subpath.slice(2)}`));
        }
      }
    }
  }

  // 处理imports字段
  if (pkg.imports) {
    for (const importName of Object.keys(pkg.imports)) {
      if (importName.startsWith("#")) {
        externals.push(pathToRegex(importName));
      }
    }
  }

  // 去重并返回
  return [...new Set(externals)];
}

/**
 * 将路径转换为正则表达式
 * @param path 路径
 * @returns 正则表达式或原路径
 */
function pathToRegex(path: string): string | RegExp {
  // 如果路径包含通配符，则转换为正则表达式
  return path.includes("*")
    ? new RegExp(
        `^${path.replace(/\./g, String.raw`\.`).replace(/\*/g, ".*")}$`,
      )
    : path;
}

/**
 * 为路径添加尾部斜杠
 * @param path 路径
 * @returns 添加尾部斜杠的路径
 */
export function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}
