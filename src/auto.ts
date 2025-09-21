import type { PackageJson } from "pkg-types";
import type { BuildEntry, BuildPreset, MkdistBuildEntry } from "./types";
import { existsSync } from "node:fs";
import { normalize, join, resolve } from "pathe";
import { consola } from "consola";
import { colors } from "consola/utils";
import { definePreset } from "./types";
import { extractExportFilenames, listRecursively, warn } from "./utils";

/**
 * 推断条目结果类型
 */
type InferEntriesResult = {
  /**
   * 构建条目数组
   */
  entries: BuildEntry[];

  /**
   * 是否为CommonJS格式
   */
  cjs?: boolean;

  /**
   * 是否生成声明文件
   */
  dts?: boolean;

  /**
   * 警告信息数组
   */
  warnings: string[];
};

/**
 * 自动构建预设
 */
export const autoPreset: BuildPreset = definePreset(() => {
  return {
    hooks: {
      /**
       * 构建准备阶段钩子函数
       * @param ctx 构建上下文
       */
      "build:prepare"(ctx): void {
        // 如果已提供条目或pkg不可用，则禁用自动检测
        if (!ctx.pkg || ctx.options.entries.length > 0) {
          return;
        }

        // 递归列出src目录中的所有文件
        const sourceFiles = listRecursively(join(ctx.options.rootDir, "src"));

        // 推断条目
        const res = inferEntries(ctx.pkg, sourceFiles, ctx.options.rootDir);

        // 处理警告信息
        for (const message of res.warnings) {
          warn(ctx, message);
        }

        // 将推断的条目添加到构建选项中
        ctx.options.entries.push(...res.entries);

        // 如果需要CommonJS格式，则设置rollup选项
        if (res.cjs) {
          ctx.options.rollup.emitCJS = true;
        }

        // 如果未定义声明选项，则根据推断结果自动设置
        if (ctx.options.declaration === undefined) {
          // 基于"package.json"启用自动检测
          // 如果"package.json"有"types"字段，则为"compatible"，否则为false
          ctx.options.declaration = res.dts ? "compatible" : false;
        }

        // 显示自动检测到的条目信息
        consola.info(
          "Automatically detected entries:",
          colors.cyan(
            ctx.options.entries
              .map((e) =>
                colors.bold(
                  e.input
                    .replace(ctx.options.rootDir + "/", "")
                    .replace(/\/$/, "/*"),
                ),
              )
              .join(", "),
          ),
          colors.gray(
            ["esm", res.cjs && "cjs", res.dts && "dts"]
              .filter(Boolean)
              .map((tag) => `[${tag}]`)
              .join(" "),
          ),
        );
      },
    },
  };
});

/**
 * 推断构建条目
 * @param pkg package.json内容，作为推断条目的源
 * @param sourceFiles 源文件列表，用于推断条目
 * @param rootDir 项目根目录
 * @returns 推断条目结果
 */
export function inferEntries(
  pkg: PackageJson,
  sourceFiles: string[],
  rootDir?: string,
): InferEntriesResult {
  const warnings = [];

  // 对文件进行排序，使嵌套最少的文件排在前面
  sourceFiles.sort((a, b) => a.split("/").length - b.split("/").length);

  // 生成所有输出文件及其格式的列表
  const outputs = extractExportFilenames(pkg.exports);

  // 处理bin字段
  if (pkg.bin) {
    const binaries =
      typeof pkg.bin === "string" ? [pkg.bin] : Object.values(pkg.bin);
    for (const file of binaries) {
      outputs.push({ file });
    }
  }

  // 处理main字段
  if (pkg.main) {
    outputs.push({ file: pkg.main });
  }

  // 处理module字段
  if (pkg.module) {
    outputs.push({ type: "esm", file: pkg.module });
  }

  // 处理types或typings字段
  if (pkg.types || pkg.typings) {
    outputs.push({ file: pkg.types || pkg.typings! });
  }

  // 尝试检测输出类型
  const isESMPkg = pkg.type === "module";
  for (const output of outputs.filter((o) => !o.type)) {
    const isJS = output.file.endsWith(".js");
    if ((isESMPkg && isJS) || output.file.endsWith(".mjs")) {
      output.type = "esm";
    } else if ((!isESMPkg && isJS) || output.file.endsWith(".cjs")) {
      output.type = "cjs";
    }
  }

  let cjs = false;
  let dts = false;

  // 从包文件中推断条目
  const entries: BuildEntry[] = [];
  for (const output of outputs) {
    // 支持的输出文件扩展名有`.d.ts`、`.cjs`和`.mjs`
    // 但我们也支持任何文件扩展名，以防用户扩展了rollup选项
    const outputSlug = output.file.replace(
      /(\*[^/\\]*|\.d\.(m|c)?ts|\.\w+)$/,
      "",
    );
    const isDir = outputSlug.endsWith("/");

    // 跳过顶级目录
    if (isDir && ["./", "/"].includes(outputSlug)) {
      continue;
    }

    // 获取入口点路径
    const possiblePaths = getEntrypointPaths(outputSlug);

    // 查找匹配的源文件
    // eslint-disable-next-line unicorn/no-array-reduce
    const input = possiblePaths.reduce<string | undefined>((source, d) => {
      if (source) {
        return source;
      }
      const SOURCE_RE = new RegExp(
        `(?<=/|$)${d}${isDir ? "" : String.raw`\.\w+`}$`,
      );
      return sourceFiles
        .find((i) => SOURCE_RE.test(i))
        ?.replace(/(\.d\.(m|c)?ts|\.\w+)$/, "");
    }, undefined as any);

    // 如果未找到输入文件
    if (!input) {
      if (!existsSync(resolve(rootDir || ".", output.file))) {
        warnings.push(`Could not find entrypoint for \`${output.file}\``);
      }
      continue;
    }

    // 如果输出类型为CommonJS，则设置cjs标志
    if (output.type === "cjs") {
      cjs = true;
    }

    // 查找或创建条目
    const entry =
      entries.find((i) => i.input === input) ||
      entries[entries.push({ input }) - 1];

    // 如果是声明文件，则设置dts标志
    if (/\.d\.(m|c)?ts$/.test(output.file)) {
      dts = true;
    }

    // 如果是目录，则设置输出目录和格式
    if (isDir) {
      entry.outDir = outputSlug;
      (entry as MkdistBuildEntry).format = output.type;
    }
  }

  return { entries, cjs, dts, warnings };
}

/**
 * 获取入口点路径
 * @param path 路径
 * @returns 入口点路径数组
 */
export const getEntrypointPaths = (path: string): string[] => {
  const segments = normalize(path).split("/");
  return segments
    .map((_, index) => segments.slice(index).join("/"))
    .filter(Boolean);
};
