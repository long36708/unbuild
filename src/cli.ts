#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import consola from "consola";
import { resolve } from "pathe";
import { name, version, description } from "../package.json";
import { build } from "./build";

/**
 * 定义主命令
 */
const main = defineCommand({
  meta: {
    // 命令名称
    name,
    // 版本号
    version,
    // 命令描述
    description,
  },
  args: {
    // 构建目录参数
    dir: {
      type: "positional",
      description: "要构建的目录",
      required: false,
    },
    // 配置文件参数
    config: {
      type: "string",
      description: [
        "要使用的配置文件，相对于当前工作目录。",
        "                 Unbuild默认会尝试从构建目录DIR中读取`build.config`。",
        "",
      ].join("\n"),
    },
    // 监听模式参数
    watch: {
      type: "boolean",
      description: "监听src目录并在更改时重新构建（实验性功能）",
    },
    // Stub模式参数
    stub: {
      type: "boolean",
      description: "为JIT编译创建包的stub",
    },
    // 压缩参数
    minify: {
      type: "boolean",
      description: "压缩构建",
    },
    // Source map参数
    sourcemap: {
      type: "boolean",
      description: "生成source map（实验性功能）",
    },
    // 并行构建参数
    parallel: {
      type: "boolean",
      description:
        "同时运行不同类型的构建（untyped, mkdist, Rollup, copy）。",
    },
  },
  /**
   * 命令执行函数
   * @param args 命令行参数
   */
  async run({ args }) {
    // 解析根目录路径
    const rootDir = resolve(process.cwd(), args.dir || ".");

    // 执行构建
    await build(rootDir, args.stub, {
      // source map选项
      sourcemap: args.sourcemap,
      // 配置文件路径
      config: args.config ? resolve(args.config) : undefined,
      // stub模式选项
      stub: args.stub,
      // 监听模式选项
      watch: args.watch,
      // Rollup选项
      rollup: {
        // ESBuild选项
        esbuild: {
          // 压缩选项
          minify: args.minify,
        },
      },
    }).catch((error) => {
      // 处理构建错误
      consola.error(`Error building ${rootDir}: ${error}`);
      throw error;
    });
  },
});

// 运行主命令
runMain(main);
