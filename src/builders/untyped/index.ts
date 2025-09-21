import { writeFile } from "node:fs/promises";
import { resolve } from "pathe";
import {
  resolveSchema,
  generateTypes,
  generateMarkdown,
  type InputObject,
} from "untyped";
import untypedPlugin from "untyped/babel-plugin";
import { pascalCase } from "scule";
import type {
  BuildContext,
  UntypedBuildEntry,
  UntypedOutputs,
} from "../../types";
import consola from "consola";
import { createJiti } from "jiti";

/**
 * 类型构建函数
 * @param ctx 构建上下文
 */
export async function typesBuild(ctx: BuildContext): Promise<void> {
  // 筛选出构建器为"untyped"的条目
  const entries = ctx.options.entries.filter(
    (entry) => entry.builder === "untyped",
  ) as UntypedBuildEntry[];
  // 调用钩子函数，通知开始处理untyped条目
  await ctx.hooks.callHook("untyped:entries", ctx, entries);

  // 遍历所有untyped条目
  for (const entry of entries) {
    // 创建选项
    const options = {
      jiti: {
        interopDefault: true,
        transformOptions: {
          babel: {
            plugins: [untypedPlugin],
          },
        },
      },
    };
    // 调用钩子函数，允许修改untyped条目选项
    await ctx.hooks.callHook("untyped:entry:options", ctx, entry, options);

    // 创建untyped Jiti实例
    const untypedJiti = createJiti(ctx.options.rootDir, options.jiti);

    // 获取输出目录
    const distDir = entry.outDir!;

    // 导入原始模式
    let rawSchema =
      ((await untypedJiti.import(resolve(ctx.options.rootDir, entry.input), {
        try: true,
      })) as InputObject) || ({} as InputObject);

    // 获取原始模式的键
    const rawSchemaKeys = Object.keys(rawSchema);
    // 如果只有一个键且为"default"，则使用默认值
    if (rawSchemaKeys.length === 1 && rawSchemaKeys[0] === "default") {
      rawSchema = (rawSchema as any).default;
    }

    // 获取默认值
    const defaults = entry.defaults || {};
    // 解析模式
    const schema = await resolveSchema(rawSchema, defaults);

    // 调用钩子函数，通知条目模式已解析
    await ctx.hooks.callHook("untyped:entry:schema", ctx, entry, schema);

    // 创建输出
    const outputs: UntypedOutputs = {
      // Markdown输出
      markdown: {
        fileName: resolve(distDir, `${entry.name}.md`),
        contents: generateMarkdown(schema),
      },
      // 模式输出
      schema: {
        fileName: `${entry.name}.schema.json`,
        contents: JSON.stringify(schema, null, 2),
      },
      // 默认值输出
      defaults: {
        fileName: `${entry.name}.defaults.json`,
        contents: JSON.stringify(defaults, null, 2),
      },
      // 声明输出
      declaration: entry.declaration
        ? {
            fileName: `${entry.name}.d.ts`,
            contents: generateTypes(schema, {
              interfaceName: pascalCase(entry.name + "-schema"),
            }),
          }
        : undefined,
    };
    // 调用钩子函数，允许修改untyped条目输出
    await ctx.hooks.callHook("untyped:entry:outputs", ctx, entry, outputs);
    // 遍历所有输出
    for (const output of Object.values(outputs)) {
      // 如果输出不存在，则跳过
      if (!output) continue; // declaration is optional
      // 写入文件
      await writeFile(
        resolve(distDir, output.fileName),
        output.contents,
        "utf8",
      );
    }
  }
  // 调用钩子函数，通知untyped构建完成
  await ctx.hooks.callHook("untyped:done", ctx);

  // 如果有条目且启用了watch模式，则发出警告
  if (entries.length > 0 && ctx.options.watch) {
    consola.warn("`untyped` builder does not support watch mode yet.");
  }
}
