import Module from "node:module";
import { promises as fsp } from "node:fs";
import { resolve, relative, isAbsolute, normalize } from "pathe";
import type { PackageJson } from "pkg-types";
import { colors } from "consola/utils";
import { consola } from "consola";
import { defu } from "defu";
import { createHooks } from "hookable";
import prettyBytes from "pretty-bytes";
import { glob } from "tinyglobby";
import {
  dumpObject,
  rmdir,
  resolvePreset,
  removeExtension,
  inferPkgExternals,
  withTrailingSlash,
} from "./utils";
import type { BuildContext, BuildConfig, BuildOptions } from "./types";
import { validatePackage, validateDependencies } from "./validate";
import { rollupBuild } from "./builders/rollup";
import { typesBuild } from "./builders/untyped";
import { mkdistBuild } from "./builders/mkdist";
import { copyBuild } from "./builders/copy";
import { createJiti } from "jiti";

/**
 * 主构建函数
 * @param rootDir 项目根目录
 * @param stub 是否为stub模式
 * @param inputConfig 输入的构建配置
 */
export async function build(
  rootDir: string,
  stub: boolean,
  inputConfig: BuildConfig & { config?: string } = {},
): Promise<void> {
  // 确定项目根目录
  rootDir = resolve(process.cwd(), rootDir || ".");

  // 创建jiti实例用于加载初始配置
  const jiti = createJiti(rootDir);

  // 加载构建配置文件
  const _buildConfig: BuildConfig | BuildConfig[] =
    (await jiti.import(inputConfig?.config || "./build.config", {
      try: !inputConfig.config,
      default: true,
    })) || {};

  // 处理构建配置数组
  const buildConfigs = (
    Array.isArray(_buildConfig) ? _buildConfig : [_buildConfig]
  ).filter(Boolean);

  // 加载package.json文件
  const pkg: PackageJson & Partial<Record<"unbuild" | "build", BuildConfig>> =
    ((await jiti.import("./package.json", {
      try: true,
      default: true,
    })) as PackageJson) || ({} as PackageJson);

  // 为build.config.ts中定义的每个构建配置调用构建函数
  const cleanedDirs: string[] = [];

  // 确定是否为watch模式和stub模式
  const _watchMode = inputConfig.watch === true;
  const _stubMode = !_watchMode && (stub || inputConfig.stub === true);

  // 如果不是watch模式也不是stub模式，则优先使用publishConfig
  if (!_watchMode && !_stubMode) {
    Object.assign(pkg, pkg.publishConfig);
  }

  // 遍历所有构建配置并执行构建
  for (const buildConfig of buildConfigs) {
    await _build(
      rootDir,
      inputConfig,
      buildConfig,
      pkg,
      cleanedDirs,
      _stubMode,
      _watchMode,
    );
  }
}

/**
 * 内部构建函数，执行实际的构建过程
 * @param rootDir 项目根目录
 * @param inputConfig 输入的构建配置
 * @param buildConfig 构建配置
 * @param pkg package.json内容
 * @param cleanedDirs 已清理的目录列表
 * @param _stubMode 是否为stub模式
 * @param _watchMode 是否为watch模式
 */
async function _build(
  rootDir: string,
  inputConfig: BuildConfig = {},
  buildConfig: BuildConfig,
  pkg: PackageJson & Partial<Record<"unbuild" | "build", BuildConfig>>,
  cleanedDirs: string[],
  _stubMode: boolean,
  _watchMode: boolean,
): Promise<void> {
  // 解析预设配置
  const preset = await resolvePreset(
    buildConfig.preset ||
      pkg.unbuild?.preset ||
      pkg.build?.preset ||
      inputConfig.preset ||
      "auto",
    rootDir,
  );

  // 合并选项配置
  const options = defu(
    buildConfig,
    pkg.unbuild || pkg.build,
    inputConfig,
    preset,
    {
      // 项目名称，默认从package.json中获取
      name: (pkg?.name || "").split("/").pop() || "default",
      // 项目根目录
      rootDir,
      // 构建条目数组
      entries: [],
      // 是否在构建前清理输出目录
      clean: true,
      // 声明文件生成选项
      declaration: undefined,
      // 输出目录
      outDir: "dist",
      // 是否为stub模式
      stub: _stubMode,
      // stub模式选项
      stubOptions: {
        /**
         * See https://github.com/unjs/jiti#%EF%B8%8F-options
         */
        jiti: {
          // 是否将默认导出转换为CommonJS模块
          interopDefault: true,
          // 模块别名映射
          alias: {},
        },
      },
      // 是否启用watch模式
      watch: _watchMode,
      // watch模式选项
      watchOptions: _watchMode
        ? {
            // 排除的文件模式
            exclude: "node_modules/**",
            // 包含的文件模式
            include: "src/**",
          }
        : undefined,
      // 外部依赖列表
      externals: [
        ...Module.builtinModules,
        ...Module.builtinModules.map((m) => "node:" + m),
      ],
      // 依赖项列表
      dependencies: [],
      // 开发依赖项列表
      devDependencies: [],
      // 对等依赖项列表
      peerDependencies: [],
      // 模块别名映射
      alias: {},
      // 替换规则
      replace: {},
      // 是否在出现警告时终止构建
      failOnWarn: true,
      // 是否生成source map
      sourcemap: false,
      // Rollup构建选项
      rollup: {
        // 是否生成CommonJS格式的输出
        emitCJS: false,
        // 是否启用watch模式
        watch: false,
        // 是否启用CommonJS桥接
        cjsBridge: false,
        // 是否内联依赖项
        inlineDependencies: false,
        // 是否保留动态导入
        preserveDynamicImports: true,
        // 输出选项
        output: {
          // https://v8.dev/features/import-attributes
          // 导入属性键名
          importAttributesKey: "with",
        },
        // 插件选项
        // 替换插件选项
        replace: {
          // 是否防止赋值替换
          preventAssignment: true,
        },
        // 别名插件选项
        alias: {},
        // 解析插件选项
        resolve: {
          // 是否优先使用内置模块
          preferBuiltins: true,
        },
        // JSON插件选项
        json: {
          // 是否优先使用const声明
          preferConst: true,
        },
        // CommonJS插件选项
        commonjs: {
          // 是否忽略try-catch块中的require调用
          ignoreTryCatch: true,
        },
        // ESBuild插件选项
        esbuild: {
          // 目标环境
          target: "esnext"
        },
        // DTS插件选项
        dts: {
          compilerOptions: {
            // https://github.com/Swatinem/rollup-plugin-dts/issues/143
            // 是否保留符号链接
            preserveSymlinks: false,
            // https://github.com/Swatinem/rollup-plugin-dts/issues/127
            // 是否启用复合项目
            composite: false,
          },
          // 是否尊重外部依赖
          respectExternal: true,
        },
      },
      // 是否并行执行不同类型的构建
      parallel: false,
    } satisfies BuildOptions,
  ) as BuildOptions;

  // 解析相对于根目录的输出目录路径
  options.outDir = resolve(options.rootDir, options.outDir);

  // 为上下文创建共享的jiti实例
  const jiti = createJiti(options.rootDir, { interopDefault: true });

  // 构建上下文
  const ctx: BuildContext = {
    // 构建选项
    options,
    // jiti实例
    jiti,
    // 警告信息集合
    warnings: new Set(),
    // package.json内容
    pkg,
    // 构建条目数组
    buildEntries: [],
    // 已使用的导入集合
    usedImports: new Set(),
    // 钩子函数管理器
    hooks: createHooks(),
  };

  // 注册钩子函数
  if (preset.hooks) {
    ctx.hooks.addHooks(preset.hooks);
  }
  if (inputConfig.hooks) {
    ctx.hooks.addHooks(inputConfig.hooks);
  }
  if (buildConfig.hooks) {
    ctx.hooks.addHooks(buildConfig.hooks);
  }

  // 允许准备和扩展上下文
  await ctx.hooks.callHook("build:prepare", ctx);

  // 标准化构建条目
  options.entries = options.entries.map((entry) =>
    typeof entry === "string" ? { input: entry } : entry,
  );

  // 处理每个构建条目
  for (const entry of options.entries) {
    // 如果条目名称不是字符串，则根据输入路径生成名称
    if (typeof entry.name !== "string") {
      let relativeInput = isAbsolute(entry.input)
        ? relative(rootDir, entry.input)
        : normalize(entry.input);
      if (relativeInput.startsWith("./")) {
        relativeInput = relativeInput.slice(2);
      }
      entry.name = removeExtension(relativeInput.replace(/^src\//, ""));
    }

    // 检查条目输入是否缺失
    if (!entry.input) {
      throw new Error("Missing entry input: " + dumpObject(entry));
    }

    // 如果未指定构建器，则根据输入路径自动推断
    if (!entry.builder) {
      entry.builder = entry.input.endsWith("/") ? "mkdist" : "rollup";
    }

    // 如果全局声明选项已定义且条目声明选项未定义，则使用全局声明选项
    if (options.declaration !== undefined && entry.declaration === undefined) {
      entry.declaration = options.declaration;
    }

    // 解析输入和输出目录的绝对路径
    entry.input = resolve(options.rootDir, entry.input);
    entry.outDir = resolve(options.rootDir, entry.outDir || options.outDir);
  }

  // 从package.json推断依赖项
  options.dependencies = Object.keys(pkg.dependencies || {});
  options.peerDependencies = Object.keys(pkg.peerDependencies || {});
  options.devDependencies = Object.keys(pkg.devDependencies || {});

  // 将所有依赖项添加为外部依赖
  options.externals.push(...inferPkgExternals(pkg));
  options.externals = [...new Set(options.externals)];

  // 调用构建前钩子函数
  await ctx.hooks.callHook("build:before", ctx);

  // 显示开始信息
  consola.info(
    colors.cyan(`${options.stub ? "Stubbing" : "Building"} ${options.name}`),
  );
  if (process.env.DEBUG) {
    consola.info(`${colors.bold("Root dir:")} ${options.rootDir}
  ${colors.bold("Entries:")}
  ${options.entries.map((entry) => "  " + dumpObject(entry)).join("\n  ")}
`);
  }

  // 清理输出目录
  if (options.clean) {
    for (const dir of new Set(
      options.entries
        .map((e) => e.outDir)
        .filter((p): p is NonNullable<typeof p> => !!p)
        .sort(),
    )) {
      // 跳过根目录、根目录的子目录以及已清理的目录
      if (
        dir === options.rootDir ||
        options.rootDir.startsWith(withTrailingSlash(dir)) ||
        cleanedDirs.some((c) => dir.startsWith(c))
      ) {
        continue;
      }
      cleanedDirs.push(dir);
      consola.info(
        `Cleaning dist directory: \`./${relative(process.cwd(), dir)}\``,
      );
      await rmdir(dir);
      await fsp.mkdir(dir, { recursive: true });
    }
  }

  // 尝试创建自链接
  // if (ctx.stub && ctx.pkg.name) {
  //   const nodemodulesDir = resolve(ctx.rootDir, 'node_modules', ctx.pkg.name)
  //   await symlink(resolve(ctx.rootDir), nodemodulesDir).catch(() => {})
  // }

  // 定义构建任务数组
  const buildTasks = [
    typesBuild, // untyped类型构建
    mkdistBuild, // mkdist构建
    rollupBuild, // rollup构建
    copyBuild, // 复制构建
  ] as const;

  // 根据配置决定是否并行执行构建任务
  if (options.parallel) {
    await Promise.all(buildTasks.map((task) => task(ctx)));
  } else {
    for (const task of buildTasks) {
      await task(ctx);
    }
  }

  // 在stub模式或watch模式下跳过剩余步骤
  if (options.stub || options.watch) {
    await ctx.hooks.callHook("build:done", ctx);
    return;
  }

  // 显示构建成功信息
  consola.success(colors.green("Build succeeded for " + options.name));

  // 查找所有输出文件并将缺失的条目作为chunks添加
  const outFiles = await glob(["**"], { cwd: options.outDir });
  for (const file of outFiles) {
    let entry = ctx.buildEntries.find((e) => e.path === file);
    if (!entry) {
      entry = {
        path: file,
        chunk: true,
      };
      ctx.buildEntries.push(entry);
    }
    if (!entry.bytes) {
      const stat = await fsp.stat(resolve(options.outDir, file));
      entry.bytes = stat.size;
    }
  }

  // 计算相对路径的辅助函数
  const rPath = (p: string): string =>
    relative(process.cwd(), resolve(options.outDir, p));

  // 处理每个构建条目并显示相关信息
  for (const entry of ctx.buildEntries.filter((e) => !e.chunk)) {
    let totalBytes = entry.bytes || 0;
    for (const chunk of entry.chunks || []) {
      totalBytes += ctx.buildEntries.find((e) => e.path === chunk)?.bytes || 0;
    }
    let line =
      `  ${colors.bold(rPath(entry.path))} (` +
      [
        totalBytes && `total size: ${colors.cyan(prettyBytes(totalBytes))}`,
        entry.bytes && `chunk size: ${colors.cyan(prettyBytes(entry.bytes))}`,
        entry.exports?.length &&
          `exports: ${colors.gray(entry.exports.join(", "))}`,
      ]
        .filter(Boolean)
        .join(", ") +
      ")";
    if (entry.chunks?.length) {
      line +=
        "\n" +
        entry.chunks
          .map((p) => {
            const chunk =
              ctx.buildEntries.find((e) => e.path === p) || ({} as any);
            return colors.gray(
              "  └─ " +
                rPath(p) +
                colors.bold(
                  chunk.bytes ? ` (${prettyBytes(chunk?.bytes)})` : "",
                ),
            );
          })
          .join("\n");
    }
    if (entry.modules?.length) {
      line +=
        "\n" +
        entry.modules
          .filter((m) => m.id.includes("node_modules"))
          .sort((a, b) => (b.bytes || 0) - (a.bytes || 0))
          .map((m) => {
            return colors.gray(
              "  📦 " +
                rPath(m.id) +
                colors.bold(m.bytes ? ` (${prettyBytes(m.bytes)})` : ""),
            );
          })
          .join("\n");
    }
    consola.log(entry.chunk ? colors.gray(line) : line);
  }

  // 显示总输出大小
  console.log(
    "Σ Total dist size (byte size):",
    colors.cyan(
      prettyBytes(ctx.buildEntries.reduce((a, e) => a + (e.bytes || 0), 0)),
    ),
  );

  // 验证依赖项和包配置
  validateDependencies(ctx);
  validatePackage(pkg, rootDir, ctx);

  // 调用构建完成钩子函数
  await ctx.hooks.callHook("build:done", ctx);

  consola.log("");

  // 处理构建警告
  if (ctx.warnings.size > 0) {
    consola.warn(
      "Build is done with some warnings:\n\n" +
        [...ctx.warnings].map((msg) => "- " + msg).join("\n"),
    );
    if (ctx.options.failOnWarn) {
      consola.error(
        "Exiting with code (1). You can change this behavior by setting `failOnWarn: false` .",
      );
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
  }
}
