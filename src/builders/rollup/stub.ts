import { writeFile, mkdir } from "node:fs/promises";
import { promises as fsp } from "node:fs";
import { resolve, dirname, extname, relative } from "pathe";
import {
  resolvePath,
  resolveModuleExportNames,
  fileURLToPath,
  pathToFileURL,
} from "mlly";
import { warn } from "../../utils";
import type { BuildContext } from "../../types";
import { makeExecutable, getShebang } from "./plugins/shebang";
import { DEFAULT_EXTENSIONS, resolveAliases } from "./utils";

/**
 * Rollup stub函数
 * @param ctx 构建上下文
 */
export async function rollupStub(ctx: BuildContext): Promise<void> {
  // 获取Babel插件
  const babelPlugins = ctx.options.stubOptions.jiti.transformOptions?.babel
    ?.plugins as any;
  // 导入的Babel插件数组
  const importedBabelPlugins: Array<string> = [];

  // #542
  // Jiti导入解析函数
  const jitiImportResolve = ctx.options.stubOptions.absoluteJitiPath
    ? (...args: string[]): string => pathToFileURL(resolve(...args))
    : relative;

  // 序列化的Jiti选项
  const serializedJitiOptions = JSON.stringify(
    {
      ...ctx.options.stubOptions.jiti,
      alias: {
        ...resolveAliases(ctx),
        ...ctx.options.stubOptions.jiti.alias,
      },
      transformOptions: {
        ...ctx.options.stubOptions.jiti.transformOptions,
        babel: {
          ...ctx.options.stubOptions.jiti.transformOptions?.babel,
          plugins: "__$BABEL_PLUGINS",
        },
      },
    },
    null,
    2,
  ).replace(
    '"__$BABEL_PLUGINS"',
    Array.isArray(babelPlugins)
      ? "[" +
          babelPlugins
            .map((plugin: string | Array<any>, i) => {
              if (Array.isArray(plugin)) {
                const [name, ...args] = plugin;
                importedBabelPlugins.push(name);
                return (
                  `[` +
                  [
                    `plugin${i}`,
                    ...args.map((val) => JSON.stringify(val)),
                  ].join(", ") +
                  "]"
                );
              } else {
                importedBabelPlugins.push(plugin);
                return `plugin${i}`;
              }
            })
            .join(",") +
          "]"
      : "[]",
  );

  // 遍历Rollup构建条目
  for (const entry of ctx.options.entries.filter(
    (entry) => entry.builder === "rollup",
  )) {
    // 输出路径
    const output = resolve(
      ctx.options.rootDir,
      ctx.options.outDir,
      entry.name!,
    );

    // 是否为ESM模块
    const isESM = ctx.pkg.type === "module";
    // 解析入口文件路径
    const resolvedEntry = fileURLToPath(ctx.jiti.esmResolve(entry.input)!);
    // 去除扩展名的入口文件路径
    const resolvedEntryWithoutExt = resolvedEntry.slice(
      0,
      Math.max(0, resolvedEntry.length - extname(resolvedEntry).length),
    );
    // 用于类型导入的解析入口文件路径
    const resolvedEntryForTypeImport = isESM
      ? `${resolvedEntry.replace(/(\.m?)(ts)$/, "$1js")}`
      : resolvedEntryWithoutExt;
    // 读取入口文件内容
    const code = await fsp.readFile(resolvedEntry, "utf8");
    // 获取Shebang
    const shebang = getShebang(code);

    // 创建输出目录
    await mkdir(dirname(output), { recursive: true });

    // CJS Stub
    if (ctx.options.rollup.emitCJS) {
      // Jiti CJS路径
      const jitiCJSPath = jitiImportResolve(
        dirname(output),
        await resolvePath("jiti", {
          url: import.meta.url,
          conditions: ["node", "require"],
        }),
      );
      // 写入CJS stub文件
      await writeFile(
        output + ".cjs",
        shebang +
          [
            `const { createJiti } = require(${JSON.stringify(jitiCJSPath)})`,
            ...importedBabelPlugins.map(
              (plugin, i) =>
                `const plugin${i} = require(${JSON.stringify(plugin)})`,
            ),
            "",
            `const jiti = createJiti(__filename, ${serializedJitiOptions})`,
            "",
            `/** @type {import(${JSON.stringify(
              resolvedEntryForTypeImport,
            )})} */`,
            `module.exports = jiti(${JSON.stringify(resolvedEntry)})`,
          ].join("\n"),
      );
    }

    // MJS Stub
    // 尝试分析导出
    const namedExports: string[] = await resolveModuleExportNames(
      resolvedEntry,
      {
        extensions: DEFAULT_EXTENSIONS,
      },
    ).catch((error) => {
      warn(ctx, `Cannot analyze ${resolvedEntry} for exports:` + error);
      return [];
    });
    // 是否有默认导出
    const hasDefaultExport =
      namedExports.includes("default") || namedExports.length === 0;

    // Jiti ESM路径
    const jitiESMPath = jitiImportResolve(
      dirname(output),
      await resolvePath("jiti", {
        url: import.meta.url,
        conditions: ["node", "import"],
      }),
    );

    // 写入MJS stub文件
    await writeFile(
      output + ".mjs",
      shebang +
        [
          `import { createJiti } from ${JSON.stringify(jitiESMPath)};`,
          ...importedBabelPlugins.map(
            (plugin, i) => `import plugin${i} from ${JSON.stringify(plugin)}`,
          ),
          "",
          `const jiti = createJiti(import.meta.url, ${serializedJitiOptions})`,
          "",
          `/** @type {import(${JSON.stringify(resolvedEntryForTypeImport)})} */`,
          `const _module = await jiti.import(${JSON.stringify(
            resolvedEntry,
          )});`,
          hasDefaultExport
            ? "\nexport default _module?.default ?? _module;"
            : "",
          ...namedExports
            .filter((name) => name !== "default")
            .map((name) => `export const ${name} = _module.${name};`),
        ].join("\n"),
    );

    // DTS Stub
    // 如果启用了声明文件生成
    if (ctx.options.declaration) {
      // DTS内容
      const dtsContent = [
        `export * from ${JSON.stringify(resolvedEntryForTypeImport)};`,
        hasDefaultExport
          ? `export { default } from ${JSON.stringify(resolvedEntryForTypeImport)};`
          : "",
      ].join("\n");
      // 写入DTS文件
      await writeFile(output + ".d.cts", dtsContent);
      await writeFile(output + ".d.mts", dtsContent);
      if (
        ctx.options.declaration === "compatible" ||
        ctx.options.declaration === true
      ) {
        await writeFile(output + ".d.ts", dtsContent);
      }
    }

    // 如果有Shebang，则使文件可执行
    if (shebang) {
      await makeExecutable(output + ".cjs");
      await makeExecutable(output + ".mjs");
    }
  }
}
