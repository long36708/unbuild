import type { PackageJson } from "pkg-types";
import type { BuildContext } from "./types";
import { existsSync } from "node:fs";
import { colors } from "consola/utils";
import { resolve } from "pathe";
import { arrayIncludes, extractExportFilenames, getpkg, warn } from "./utils";

/**
 * 验证依赖项
 * @param ctx 构建上下文
 */
export function validateDependencies(ctx: BuildContext): void {
  // 已使用的依赖项集合
  const usedDependencies = new Set<string>();

  // 未使用的依赖项集合
  const unusedDependencies = new Set<string>(
    Object.keys(ctx.pkg.dependencies || {}),
  );

  // 隐式依赖项集合
  const implicitDependencies = new Set<string>();

  // 遍历已使用的导入
  for (const id of ctx.usedImports) {
    // 从未使用依赖项中删除已使用的依赖项
    unusedDependencies.delete(id);
    // 将已使用的依赖项添加到已使用依赖项集合中
    usedDependencies.add(id);
  }

  // 如果依赖项是数组，则从未使用依赖项中删除这些依赖项
  if (Array.isArray(ctx.options.dependencies)) {
    for (const id of ctx.options.dependencies) {
      unusedDependencies.delete(id);
    }
  }

  // 遍历已使用的依赖项
  for (const id of usedDependencies) {
    // 检查是否为隐式依赖项
    if (
      !arrayIncludes(ctx.options.externals, id) &&
      !id.startsWith("chunks/") &&
      !ctx.options.dependencies.includes(getpkg(id)) &&
      !ctx.options.peerDependencies.includes(getpkg(id))
    ) {
      implicitDependencies.add(id);
    }
  }

  // 如果存在未使用的依赖项，则发出警告
  if (unusedDependencies.size > 0) {
    warn(
      ctx,
      "Potential unused dependencies found: " +
        [...unusedDependencies].map((id) => colors.cyan(id)).join(", "),
    );
  }

  // 如果存在隐式依赖项且未启用内联依赖项，则发出警告
  if (implicitDependencies.size > 0 && !ctx.options.rollup.inlineDependencies) {
    warn(
      ctx,
      "Potential implicit dependencies found: " +
        [...implicitDependencies].map((id) => colors.cyan(id)).join(", "),
    );
  }
}

/**
 * 验证包配置
 * @param pkg package.json内容
 * @param rootDir 项目根目录
 * @param ctx 构建上下文
 */
export function validatePackage(
  pkg: PackageJson,
  rootDir: string,
  ctx: BuildContext,
): void {
  // 如果没有package.json，则直接返回
  if (!pkg) {
    return;
  }

  // 创建文件名集合
  const filenames = new Set(
    [
      // bin字段
      ...(typeof pkg.bin === "string"
        ? [pkg.bin]
        : Object.values(pkg.bin || {})),
      // main字段
      pkg.main,
      // module字段
      pkg.module,
      // types字段
      pkg.types,
      // typings字段
      pkg.typings,
      // exports字段中的文件
      ...extractExportFilenames(pkg.exports).map((i) => i.file),
    ].map((i) => i && resolve(rootDir, i.replace(/\/[^/]*\*.*$/, ""))),
  );

  // 缺失的输出文件数组
  const missingOutputs = [];

  // 遍历文件名集合
  for (const filename of filenames) {
    // 检查文件是否存在
    if (filename && !filename.includes("*") && !existsSync(filename)) {
      missingOutputs.push(filename.replace(rootDir + "/", ""));
    }
  }

  // 如果存在缺失的输出文件，则发出警告
  if (missingOutputs.length > 0) {
    warn(
      ctx,
      `Potential missing package.json files: ${missingOutputs
        .map((o) => colors.cyan(o))
        .join(", ")}`,
    );
  }
}
