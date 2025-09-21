# unbuild

<!-- automd:badges -->

[![npm version](https://img.shields.io/npm/v/unbuild)](https://npmjs.com/package/unbuild)
[![npm downloads](https://img.shields.io/npm/dm/unbuild)](https://npm.chart.dev/unbuild)

<!-- /automd -->

> 一个统一的JavaScript构建系统

> [!NOTE]
> 我们正在试验使用 [obuild](https://github.com/unjs/obuild) 作为下一代基于 [rolldown](https://github.com/rolldown/rolldown) 的构建工具。
>
> 如果你主要需要更快的构建速度而不介意尝试测试版软件，请试试看！

### 📦 优化的打包器

基于 [rollup](https://rollupjs.org) 的强大打包器，支持 TypeScript 并生成 CommonJS 和模块格式 + 类型声明。

### 🪄 自动化配置

自动推断构建配置和入口点从 `package.json`。

### 📁 无捆绑构建

与 [mkdist](https://github.com/unjs/mkdist) 集成，用于生成无捆绑的 dist 文件，通过文件到文件的转译。

### ✨ 被动监听器

使用 `unbuild --stub` 一次性存根 `dist`（由 [jiti](https://github.com/unjs/jiti) 提供支持），你可以在开发过程中尝试和链接你的项目而无需监听和重新构建。

### ✍ Untype 生成器

与 [untyped](https://github.com/unjs/untyped) 集成。

### ✔️ 安全构建

自动检查各种构建问题，如潜在的**缺失**和**未使用**的[依赖](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)并使 CI 失败。

CLI 输出还包括输出大小和导出，以便快速检查。

## 使用方法

创建 `src/index.ts`:

```js
export const log = (...args) => {
  console.log(...args);
};
```

更新 `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "build": "unbuild",
    "prepack": "unbuild"
  },
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

> **注意**
> 你可以在 [unjs/template](https://github.com/unjs/template) 找到更完整的项目设置示例。

使用 `unbuild` 构建:

```sh
npx unbuild
```

配置会自动从映射到 `src/` 目录的 `package.json` 字段中推断出来。如需更多控制，请继续阅读下一节。

## 配置

创建 `build.config.ts`:

```js
export default {
  entries: ["./src/index"],
};
```

你可以使用 `package.json` 中的 `unbuild` 键或 `build.config.{js,cjs,mjs,ts,mts,cts,json}` 来指定配置。

查看选项 [这里](./src/types.ts).

示例:

```js
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  // 如果未提供 entries，将从 package.json 自动推断
  entries: [
    // 默认
    "./src/index",
    // mkdist 构建器保持原始源结构进行文件到文件的转译
    {
      builder: "mkdist",
      input: "./src/package/components/",
      outDir: "./build/components",
    },
  ],

  // 更改 outDir，默认为 'dist'
  outDir: "build",

  // 生成 .d.ts 声明文件
  declaration: true,
});
```

或者使用多个构建，你可以声明一个配置数组:

```js
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig([
  {
    // 如果未提供 entries，将从 package.json 自动推断
    entries: [
      // 默认
      "./src/index",
      // mkdist 构建器保持原始源结构进行文件到文件的转译
      {
        builder: "mkdist",
        input: "./src/package/components/",
        outDir: "./build/components",
      },
    ],

    // 更改 outDir，默认为 'dist'
    outDir: "build",

    /**
     * * `compatible` 意味着 "src/index.ts" 将生成 "dist/index.d.mts", "dist/index.d.cts" 和 "dist/index.d.ts".
     * * `node16` 意味着 "src/index.ts" 将生成 "dist/index.d.mts" 和 "dist/index.d.cts".
     * * `true` 等同于 `compatible`.
     * * `false` 将禁用声明生成.
     * * `undefined` 将根据 "package.json" 自动检测. 如果 "package.json" 有 "types" 字段，则为 `"compatible"`，否则为 `false`.
     */
    declaration: "compatible",
  },
  {
    name: "minified",
    entries: ["./src/index"],
    outDir: "build/min",
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
]);
```

## 示例

### 装饰器支持

在 `build.config.ts` 中

```ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rollup: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
});
```

### 生成源映射

```ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  sourcemap: true,
});
```

## 💻 开发

- 克隆此仓库
- 使用 `corepack enable` 启用 [Corepack](https://github.com/nodejs/corepack)（对于 Node.js < 16.10 使用 `npm i -g corepack`）
- 使用 `pnpm install` 安装依赖
- 使用 `pnpm dev` 运行交互式测试

## 许可证

[MIT](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unbuild?style=flat-square
[npm-version-href]: https://npmjs.com/package/unbuild
[npm-downloads-src]: https://img.shields.io/npm/dm/unbuild?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/unbuild
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/unjs/unbuild/ci.yml?style=flat-square
[github-actions-href]: https://github.com/unjs/unbuild/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/unbuild/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/unbuild
