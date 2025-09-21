# 更新日志

所有重要的项目变更都将记录在这个文件中。请查看 [standard-version](https://github.com/conventional-changelog/standard-version) 了解提交指南。

## v3.6.1

[比较变更](https://github.com/unjs/unbuild/compare/v3.6.0...v3.6.1)

### 🩹 修复

- 在存根模式中使用 pathToFileURL 处理绝对路径 ([#546](https://github.com/unjs/unbuild/pull/546))

### 🏡 日常维护

- 更新 lockfile ([5af91b1](https://github.com/unjs/unbuild/commit/5af91b1))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Julien Huang ([@huang-julien](https://github.com/huang-julien))

## v3.6.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.5.0...v3.6.0)

### 🚀 增强功能

- 支持 `absoluteJitiPath` 用于存根模式 ([#542](https://github.com/unjs/unbuild/pull/542))

### 🩹 修复

- **types:** 改进类型安全性 ([#516](https://github.com/unjs/unbuild/pull/516))

### 📖 文档

- 移除 `dts` 类型的错误 jsdoc ([#540](https://github.com/unjs/unbuild/pull/540))

### 🏡 日常维护

- 添加关于 obuild 的说明 ([a751e3b](https://github.com/unjs/unbuild/commit/a751e3b))
- 更新依赖 ([2951dfd](https://github.com/unjs/unbuild/commit/2951dfd))
- 更新 eslint 配置 ([66b9604](https://github.com/unjs/unbuild/commit/66b9604))

### ✅ 测试

- 仅包含 src 目录进行覆盖率报告 ([#525](https://github.com/unjs/unbuild/pull/525))

### ❤️ 贡献者

- Kanon ([@ysknsid25](https://github.com/ysknsid25))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Bobbie Goede <bobbiegoede@gmail.com>
- Kricsleo ([@kricsleo](https://github.com/kricsleo))
- Daniel Roe ([@danielroe](https://github.com/danielroe))

## v3.5.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.4.1...v3.5.0)

### 🚀 增强功能

- 使用 `fix-dts-default-cjs-exports` 转换 cjs 类型 ([#513](https://github.com/unjs/unbuild/pull/513))

### 🏡 日常维护

- **release:** V3.4.1 ([b408ac0](https://github.com/unjs/unbuild/commit/b408ac0))
- 更新 untyped 到 v2 ([24997cc](https://github.com/unjs/unbuild/commit/24997cc))
- **release:** V3.4.2 ([045ebf2](https://github.com/unjs/unbuild/commit/045ebf2))

### ❤️ 贡献者

- Joaquín Sánchez ([@userquin](https://github.com/userquin))
- Pooya Parsa ([@pi0](https://github.com/pi0))

## v3.4.2

[比较变更](https://github.com/unjs/unbuild/compare/v3.4.1...v3.4.2)

### 🏡 日常维护

- 更新 untyped 到 v2 ([24997cc](https://github.com/unjs/unbuild/commit/24997cc))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v3.4.1

[比较变更](https://github.com/unjs/unbuild/compare/v3.4.0...v3.4.1)

### 🩹 修复

- 在生成声明时过滤 commonjs 插件 ([#495](https://github.com/unjs/unbuild/pull/495))

### ❤️ 贡献者

- Kricsleo ([@kricsleo](https://github.com/kricsleo))

## v3.4.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.3.1...v3.4.0)

### 🚀 增强功能

- 当定义时优先使用 `package.json` 中的 `publishConfig` ([#506](https://github.com/unjs/unbuild/pull/506))

### 🩹 修复

- 解决 `tsconfig.json` 中的 `composite` 问题 ([#504](https://github.com/unjs/unbuild/pull/504))

### 📦 构建

- 移除额外的 dist 文件 ([c0c00ad](https://github.com/unjs/unbuild/commit/c0c00ad))

### 🏡 日常维护

- 更新依赖 ([60154b1](https://github.com/unjs/unbuild/commit/60154b1))
- 更新依赖 ([2448af1](https://github.com/unjs/unbuild/commit/2448af1))
- 更新 pnpm ([b43bdf1](https://github.com/unjs/unbuild/commit/b43bdf1))
- 更新 `JavaScript` 大小写在 pkg 描述中 ([#493](https://github.com/unjs/unbuild/pull/493))
- 更新 exports 字段 ([0b0d90c](https://github.com/unjs/unbuild/commit/0b0d90c))
- 更新构建配置 ([61054fe](https://github.com/unjs/unbuild/commit/61054fe))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Kricsleo ([@kricsleo](https://github.com/kricsleo))
- @beer ([@iiio2](https://github.com/iiio2))

## v3.3.1

[比较变更](https://github.com/unjs/unbuild/compare/v3.3.0...v3.3.1)

### 🩹 修复

- **rollup:** 改进外部检测 ([#488](https://github.com/unjs/unbuild/pull/488))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.3.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.2.0...v3.3.0)

### 🚀 增强功能

- 允许在 `inlineDependencies` 中指定要内联的依赖 ([#480](https://github.com/unjs/unbuild/pull/480))

### 🩹 修复

- **rollup:** 使用 pathe 工具解析别名 ([#483](https://github.com/unjs/unbuild/pull/483))

### 💅 重构

- 内联 `withTrailingSlash` 工具 ([#482](https://github.com/unjs/unbuild/pull/482))

### 🏡 日常维护

- 更新依赖 ([edc8784](https://github.com/unjs/unbuild/commit/edc8784))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Kricsleo ([@kricsleo](http://github.com/kricsleo))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v3.2.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.1.0...v3.2.0)

### 🚀 增强功能

- **mkdist:** 如果 `mkdist` 在创建声明时出错则使构建失败 ([#473](https://github.com/unjs/unbuild/pull/473))

### 🩹 修复

- 正确处理 `.d.cts` 默认导出类型 ([#458](https://github.com/unjs/unbuild/pull/458))

### 🏡 日常维护

- 更新依赖 ([4536320](https://github.com/unjs/unbuild/commit/4536320))

### ❤️ 贡献者

- Kricsleo ([@kricsleo](http://github.com/kricsleo))
- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.1.0

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.1...v3.1.0)

### 🚀 增强功能

- 支持并行构建 ([af19b1b](https://github.com/unjs/unbuild/commit/af19b1b))
- 从包的 `name`、`exports` 和 `imports` 推断外部依赖 ([#469](https://github.com/unjs/unbuild/pull/469))
- **rollup:** 使用 `production` 条件解析 ([#470](https://github.com/unjs/unbuild/pull/470))

### 🩹 修复

- 解析目录上的预设 ([#465](https://github.com/unjs/unbuild/pull/465))
- 仅将 `@types/` 从 `devDependencies` 外部化 ([#471](https://github.com/unjs/unbuild/pull/471))

### 🏡 日常维护

- 移除未使用的导入 ([#463](https://github.com/unjs/unbuild/pull/463))
- 应用自动化更新 ([f724382](https://github.com/unjs/unbuild/commit/f724382))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sunny-117 <zhiqiangfu6@gmail.com>
- Christian Preston ([@cpreston321](http://github.com/cpreston321))
- Sunny ([@Sunny-117](http://github.com/Sunny-117))

## v3.0.1

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0...v3.0.1)

### 🩹 修复

- **rollup:** 从存根中取消默认导出 ([#455](https://github.com/unjs/unbuild/pull/455))

### 🏡 日常维护

- 更新 changeloge.md ([577b841](https://github.com/unjs/unbuild/commit/577b841))

### ❤️ 贡献者

- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0

请查看 [github 发布说明](https://github.com/unjs/unbuild/releases/edit/v3.0.0).

## v3.0.0-rc.11

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.10...v3.0.0-rc.11)

### 🩹 修复

- **untyped:** 如果是唯一导出则使用 schema 模块的默认导出 ([cc26726](https://github.com/unjs/unbuild/commit/cc26726))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.10

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.9...v3.0.0-rc.10)

### 🚀 增强功能

- 向 CLI 添加 `--config` 参数 ([#440](https://github.com/unjs/unbuild/pull/440))

### 🩹 修复

- 更新到 jiti 2.3 ([9147c3e](https://github.com/unjs/unbuild/commit/9147c3e))
- Untyped 声明输出是可选的 ([5820182](https://github.com/unjs/unbuild/commit/5820182))

### 📖 文档

- 添加更多使用信息 ([#401](https://github.com/unjs/unbuild/pull/401))

### 🏡 日常维护

- 更新依赖 ([c5e0b89](https://github.com/unjs/unbuild/commit/c5e0b89))
- 移除额外的默认检查 ([b380758](https://github.com/unjs/unbuild/commit/b380758))
- 启用 automd ([2ea153a](https://github.com/unjs/unbuild/commit/2ea153a))
- 更新 mkdist ([877906f](https://github.com/unjs/unbuild/commit/877906f))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- 阿菜 Cai <1064425721@qq.com>
- Joaquín Sánchez ([@userquin](http://github.com/userquin))

## v3.0.0-rc.9

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.8...v3.0.0-rc.9)

### 🩹 修复

- **stub:** 默认启用 `interopDefault` ([8e6f7e4](https://github.com/unjs/unbuild/commit/8e6f7e4))
- **config:** 仅采用默认导出 ([fefafec](https://github.com/unjs/unbuild/commit/fefafec))

### 🏡 日常维护

- 移除未使用的依赖 ([1a65aef](https://github.com/unjs/unbuild/commit/1a65aef))
- 更新依赖 ([f7ab6ce](https://github.com/unjs/unbuild/commit/f7ab6ce))
- Lint ([262a35a](https://github.com/unjs/unbuild/commit/262a35a))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.8

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.7...v3.0.0-rc.8)

### 🩹 修复

- 规范化解析路径 ([2640083](https://github.com/unjs/unbuild/commit/2640083))

### 💅 重构

- 用 tinyglobby 替换 fast-glob ([#426](https://github.com/unjs/unbuild/pull/426))

### 📖 文档

- 修复小拼写错误 ([#414](https://github.com/unjs/unbuild/pull/414))

### 🏡 日常维护

- 更新依赖 ([2f815ef](https://github.com/unjs/unbuild/commit/2f815ef))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Superchupu ([@SuperchupuDev](http://github.com/SuperchupuDev))
- @beer ([@iiio2](http://github.com/iiio2))

## v3.0.0-rc.7

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.6...v3.0.0-rc.7)

### 💅 重构

- 用 `fast-glob` 替换 `globby` ([#418](https://github.com/unjs/unbuild/pull/418))

### 🏡 日常维护

- 移除已解决的 @ts-expect-error ([733a914](https://github.com/unjs/unbuild/commit/733a914))
- 更新依赖 ([6e3be15](https://github.com/unjs/unbuild/commit/6e3be15))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sukka <isukkaw@gmail.com>

## v3.0.0-rc.6

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.5...v3.0.0-rc.6)

### 🩹 修复

- **untyped:** 使用自定义 jiti 实例 ([00ded57](https://github.com/unjs/unbuild/commit/00ded57))

### 🏡 日常维护

- Eslint 忽略 `test/fixture/dist` ([66a8db3](https://github.com/unjs/unbuild/commit/66a8db3))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.5

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.4...v3.0.0-rc.5)

### 🩹 修复

- **rollup:** 保留空的仅类型模块 ([7a6469b](https://github.com/unjs/unbuild/commit/7a6469b))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.4

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.3...v3.0.0-rc.4)

### 🩹 修复

- **rollup:** 保留空的（仅类型）模块 ([a9158e2](https://github.com/unjs/unbuild/commit/a9158e2))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.3

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.2...v3.0.0-rc.3)

### 🚀 增强功能

- 升级到 jiti v2 beta ([#409](https://github.com/unjs/unbuild/pull/409))

### 🩹 修复

- 类型 `RollupOptions.plugins` 为数组 ([62fa930](https://github.com/unjs/unbuild/commit/62fa930))
- 将所有加载器扩展名添加到 esbuild include ([8ab22ff](https://github.com/unjs/unbuild/commit/8ab22ff))
- 为配置加载器和内部启用 jiti `interopDefault` (ref: #409) ([#409](https://github.com/unjs/unbuild/issues/409))

### 💅 重构

- 彻底改革构建器结构 ([#410](https://github.com/unjs/unbuild/pull/410))
- 添加显式返回类型 ([#412](https://github.com/unjs/unbuild/pull/412))
- 使用 `colors` 从 `consola/utils` ([6a8f36d](https://github.com/unjs/unbuild/commit/6a8f36d))

### 🏡 日常维护

- 升级 `@rollup/plugin-commonjs` 到 26 ([9392ec3](https://github.com/unjs/unbuild/commit/9392ec3))
- 更新依赖 ([d886ad5](https://github.com/unjs/unbuild/commit/d886ad5))
- 更新发布脚本 ([8ce4090](https://github.com/unjs/unbuild/commit/8ce4090))
- 移除未使用的导入 ([04c2b5c](https://github.com/unjs/unbuild/commit/04c2b5c))
- 为变量导出添加显式类型 ([af26e40](https://github.com/unjs/unbuild/commit/af26e40))
- 更严格的类型检查 ([#413](https://github.com/unjs/unbuild/pull/413))
- 向发布脚本添加 publishTag ([577484c](https://github.com/unjs/unbuild/commit/577484c))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v3.0.0-rc.2

[比较变更](https://github.com/unjs/unbuild/compare/v3.0.0-rc.1...v3.0.0-rc.2)

### 🚀 增强功能

- 支持 `copy` 构建器 ([#389](https://github.com/unjs/unbuild/pull/389))
- 实验性活跃监听器用于 rollup ([#364](https://github.com/unjs/unbuild/pull/364))
- **rollup:** 添加 `.mts` 和 `.cts` 到支持的扩展名 ([633ffe9](https://github.com/unjs/unbuild/commit/633ffe9))
- 支持自定义 jiti 插件用于存根模式 ([#368](https://github.com/unjs/unbuild/pull/368))

### 🩹 修复

- 如果包类型是 `module` 则生成具有显式扩展名导入的存根类型 ([#371](https://github.com/unjs/unbuild/pull/371))
- 修正存根模式的 dts 生成 ([#314](https://github.com/unjs/unbuild/pull/314))
- **rollup:** 处理检查外部依赖时的别名 ([#384](https://github.com/unjs/unbuild/pull/384))
- **rollup:** 更新 `importAttributesKey` 为 `with` ([27bcba8](https://github.com/unjs/unbuild/commit/27bcba8))

### 📖 文档

- 添加更多 jsdocs ([#363](https://github.com/unjs/unbuild/pull/363))
- 添加示例 ([#334](https://github.com/unjs/unbuild/pull/334))

### 🏡 日常维护

- **release:** V3.0.0-rc.1 ([0419efa](https://github.com/unjs/unbuild/commit/0419efa))
- 更新预发布脚本 ([94615cf](https://github.com/unjs/unbuild/commit/94615cf))
- 修复注释中的拼写错误 ([#393](https://github.com/unjs/unbuild/pull/393))
- 更新 eslint 到 v9 ([f085607](https://github.com/unjs/unbuild/commit/f085607))
- 更新依赖 ([5de86d7](https://github.com/unjs/unbuild/commit/5de86d7))
- 应用自动化 lint 修复 ([225338e](https://github.com/unjs/unbuild/commit/225338e))
- 更新 ci ([8b39cfd](https://github.com/unjs/unbuild/commit/8b39cfd))

### 🤖 CI

- 测试 node v18 ([7bc5321](https://github.com/unjs/unbuild/commit/7bc5321))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- S3xysteak ([@s3xysteak](http://github.com/s3xysteak))
- Weng <157215725@qq.com>
- ZHAO Jin-Xiang <xiaoxiangmoe@gmail.com>
- Joe McKenney ([@joemckenney](http://github.com/joemckenney))
- Estéban <e.soubiran25@gmail.com>
- Yasuhiro SHIMIZU <the.phantom.bane@gmail.com>
- 阿菜 Cai <1064425721@qq.com>
- Marco Solazzi <marco.solazzi@gmail.com>
- Shoma-mano ([@shoma-mano](http://github.com/shoma-mano))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v3.0.0-rc.1

[比较变更](https://github.com/unjs/unbuild/compare/v2.0.0...v3.0.0-rc.1)

### 🚀 增强功能

- ⚠️ 升级到 rollup v4 ([#327](https://github.com/unjs/unbuild/pull/327))
- 支持禁用 `preserveDynamicImports` ([#322](https://github.com/unjs/unbuild/pull/322))
- **rollup:** ⚠️ 默认为 `esnext` 构建目标 ([#335](https://github.com/unjs/unbuild/pull/335))

### 🩹 修复

- 不要清理设置为 `outDir` 的根目录 ([#343](https://github.com/unjs/unbuild/pull/343))

### 💅 重构

- 使用 `jiti.import` 用于 esm 存根并改进模板 ([#300](https://github.com/unjs/unbuild/pull/300))

### 📖 文档

- 更新 `inferEntries` 的 jsdocs ([#310](https://github.com/unjs/unbuild/pull/310))

### 🏡 日常维护

- 更新依赖 ([83ea4f0](https://github.com/unjs/unbuild/commit/83ea4f0))
- 更新依赖 ([4d69ebe](https://github.com/unjs/unbuild/commit/4d69ebe))
- 添加预发布脚本 ([9c48ca4](https://github.com/unjs/unbuild/commit/9c48ca4))

#### ⚠️ 破坏性变更

- ⚠️ 升级到 rollup v4 ([#327](https://github.com/unjs/unbuild/pull/327))
- **rollup:** ⚠️ 默认为 `esnext` 构建目标 ([#335](https://github.com/unjs/unbuild/pull/335))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>
- Anthony Fu <anthonyfu117@hotmail.com>
- Brendon Matos <brendonferreiradm@gmail.com>
- Estéban ([@Barbapapazes](http://github.com/Barbapapazes))
- 翠 / Green <green@sapphi.red>

## v2.0.0

[比较变更](https://github.com/unjs/unbuild/compare/v2.0.0-rc.0...v2.0.0)

### 🏡 日常维护

- 更新依赖 ([33b20a4](https://github.com/unjs/unbuild/commit/33b20a4))
- 更新依赖 ([8d8a3d7](https://github.com/unjs/unbuild/commit/8d8a3d7))

### 🤖 CI

- 使用传统提交进行自动修复 ([#294](https://github.com/unjs/unbuild/pull/294))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>

## v2.0.0-rc.0

[比较变更](https://github.com/unjs/unbuild/compare/v1.2.1...v2.0.0-rc.0)

### 🚀 增强功能

- 生成 `.d.mts` 和 `.d.cts` 声明 ([#273](https://github.com/unjs/unbuild/pull/273))
- 支持多个构建配置 ([#275](https://github.com/unjs/unbuild/pull/275))
- 支持嵌套子路径 ([#280](https://github.com/unjs/unbuild/pull/280))
- 允许自定义存根条目的 jiti 选项 ([#282](https://github.com/unjs/unbuild/pull/282))
- 支持存根模式的别名 ([#283](https://github.com/unjs/unbuild/pull/283))
- 迁移到 `unjs/citty` ([#284](https://github.com/unjs/unbuild/pull/284))
- **cli:** 支持 `--minify` ([#285](https://github.com/unjs/unbuild/pull/285))
- 源映射支持 ([#286](https://github.com/unjs/unbuild/pull/286))

### 🩹 修复

- 在匹配条目时尊重目录分隔符 ([#214](https://github.com/unjs/unbuild/pull/214))
- **esbuild:** 修复 `sourcemap` 选项中的拼写错误 ([#259](https://github.com/unjs/unbuild/pull/259))
- 移除默认输出名称中的扩展名 ([#279](https://github.com/unjs/unbuild/pull/279))
- **rollup:** 检查模块 id 与外部依赖 ([#270](https://github.com/unjs/unbuild/pull/270))
- **esbuild:** 应用 minify 与相应的加载器 ([#254](https://github.com/unjs/unbuild/pull/254))
- **esbuild:** 不要压缩声明 ([83b3ed2](https://github.com/unjs/unbuild/commit/83b3ed2))
- **mkdist:** 允许传递所有可能的选项 ([f40a889](https://github.com/unjs/unbuild/commit/f40a889))
- 对于多构建仅清理 dist 目录一次 ([11c47c8](https://github.com/unjs/unbuild/commit/11c47c8))
- **auto:** 避免对现有文件发出警告 ([#287](https://github.com/unjs/unbuild/pull/287))

### 💅 重构

- **rollup:** ⚠️ 改进 esbuild 选项处理 ([#278](https://github.com/unjs/unbuild/pull/278))

### 📦 构建

- ⚠️ 使 typescript 成为对等依赖 ([f31c6a4](https://github.com/unjs/unbuild/commit/f31c6a4))

### 🏡 日常维护

- **release:** V1.2.1 ([968612b](https://github.com/unjs/unbuild/commit/968612b))
- 更新徽章 ([#260](https://github.com/unjs/unbuild/pull/260))
- 更新所有非主要依赖 ([9518aa8](https://github.com/unjs/unbuild/commit/9518aa8))
- 更新开发依赖 ([a446556](https://github.com/unjs/unbuild/commit/a446556))
- 格式化代码 ([87e5035](https://github.com/unjs/unbuild/commit/87e5035))
- 修复 lint 问题 ([b711242](https://github.com/unjs/unbuild/commit/b711242))
- 格式化代码 ([6ac2e9f](https://github.com/unjs/unbuild/commit/6ac2e9f))
- 添加自动修复 ci ([075b7ad](https://github.com/unjs/unbuild/commit/075b7ad))
- 使用 prettier v3 格式化 ([40ec1d9](https://github.com/unjs/unbuild/commit/40ec1d9))
- 更新 mkdist ([1234f75](https://github.com/unjs/unbuild/commit/1234f75))
- 为 min + sourcemap fixture 启用声明 ([7dcda3f](https://github.com/unjs/unbuild/commit/7dcda3f))

#### ⚠️ 破坏性变更

- **rollup:** ⚠️ 改进 esbuild 选项处理 ([#278](https://github.com/unjs/unbuild/pull/278))
- ⚠️ 使 typescript 成为对等依赖 ([f31c6a4](https://github.com/unjs/unbuild/commit/f31c6a4))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sukka <isukkaw@gmail.com>
- Wang Zhi ([@yfwz100](http://github.com/yfwz100))
- Patryk Tomczyk
- JounQin ([@JounQin](http://github.com/JounQin))
- ZHAO Jin-Xiang <xiaoxiangmoe@gmail.com>
- LitoMore
- 科科 <bernankez@qq.com>

## v1.2.1

[比较变更](https://github.com/unjs/unbuild/compare/v1.2.0...v1.2.1)

### 💅 重构

- 更新到 consola v3 ([3bb25b2](https://github.com/unjs/unbuild/commit/3bb25b2))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.2.0

[比较变更](https://github.com/unjs/unbuild/compare/v1.1.2...v1.2.0)

### 🚀 增强功能

- **rollup:** 将 `jsx` 和 `tsx` 添加到 esbuild 加载器默认值 ([#198](https://github.com/unjs/unbuild/pull/198))
- **rollup:** 允许在 `externals` 数组中使用正则表达式 ([#145](https://github.com/unjs/unbuild/pull/145))
- **mkdist:** 添加新的 `pattern` 选项 ([#139](https://github.com/unjs/unbuild/pull/139))
- 支持 esbuild `charset` 选项 ([#190](https://github.com/unjs/unbuild/pull/190))
- **rollup:** 允许传递任何所有常见的 esbuild 选项 ([8e81e2a](https://github.com/unjs/unbuild/commit/8e81e2a))
- **rollup:** 在 cli 输出中显示打包的 npm 包大小 ([#243](https://github.com/unjs/unbuild/pull/243))

### 🩹 修复

- 传递缺失的 esbuild jsx 工厂选项 ([#224](https://github.com/unjs/unbuild/pull/224))
- **rollup:** 处理 `rollup.alias.entries` 选项的数组格式 ([#220](https://github.com/unjs/unbuild/pull/220))
- **rollup:** 启用 `interop: compat` 以实现 cjs 兼容性 ([#215](https://github.com/unjs/unbuild/pull/215))

### 📖 文档

- 向默认 `exports` 添加 `types` ([#226](https://github.com/unjs/unbuild/pull/226))
- 暂时移除 `types` 字段建议 ([e8988ae](https://github.com/unjs/unbuild/commit/e8988ae))

### 🏡 日常维护

- 更新 lockfile ([cc99946](https://github.com/unjs/unbuild/commit/cc99946))
- 修复 lint 问题 ([ee1ced8](https://github.com/unjs/unbuild/commit/ee1ced8))
- 使用 pnpm 8 重新创建 lockfile ([06d0044](https://github.com/unjs/unbuild/commit/06d0044))

### ❤️ 贡献者

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Kid
- Ntnyq ([@ntnyq](http://github.com/ntnyq))
- Marco Solazzi <marco.solazzi@gmail.com>
- Zoeyzhao19
- Dunqing ([@Dunqing](http://github.com/Dunqing))
- XLor <yjl9903@onekuma.cn>

## v1.1.2

[比较变更](https://github.com/unjs/unbuild/compare/v1.1.1...v1.1.2)

### 💅 重构

- 使用 `fs.mkdir` 替代 `mkdirp` ([6ee6384](https://github.com/unjs/unbuild/commit/6ee6384))
- 使用 `fs.mkdir` 替代 `mkdirp` ([8e6962e](https://github.com/unjs/unbuild/commit/8e6962e))

### 🏡 日常维护

- 更新依赖 ([87bea65](https://github.com/unjs/unbuild/commit/87bea65))

### ❤️ 贡献者

- Pooya Parsa <pooya@pi0.io>

## v1.1.1

[比较变更](https://github.com/unjs/unbuild/compare/v1.1.0...v1.1.1)

### 🩹 修复

- 使用 fs 替代 rimraf ([bbd374d](https://github.com/unjs/unbuild/commit/bbd374d))

### ❤️ 贡献者

- Pooya Parsa <pooya@pi0.io>

## v1.1.0

[比较变更](https://github.com/unjs/unbuild/compare/v1.0.2...v1.1.0)

### 🚀 增强功能

- 更新所有 rollup 依赖 ([3d1b976](https://github.com/unjs/unbuild/commit/3d1b976))

### 🩹 修复

- 防止压缩 `.d.ts` 文件 ([#185](https://github.com/unjs/unbuild/pull/185))

### 🎨 样式

- 使用 prettier 格式化 ([818ced7](https://github.com/unjs/unbuild/commit/818ced7))

### ❤️ 贡献者

- Pooya Parsa <pooya@pi0.io>
- Marco Solazzi <marco.solazzi@gmail.com>

## v1.0.2

[比较变更](https://github.com/unjs/unbuild/compare/v1.0.1...v1.0.2)

### 🩹 修复

- 不要在绝对 windows 路径上抛出错误 ([#166](https://github.com/unjs/unbuild/pull/166))

### 🏡 日常维护

- 移除未使用的依赖 ([79cc03d](https://github.com/unjs/unbuild/commit/79cc03d))

### ❤️ 贡献者

- Pooya Parsa <pooya@pi0.io>
- Daniel Roe <daniel@roe.dev>

### [1.0.1](https://github.com/unjs/unbuild/compare/v1.0.0...v1.0.1) (2022-11-16)

## [1.0.0](https://github.com/unjs/unbuild/compare/v0.9.4...v1.0.0) (2022-11-16)

### [0.8.9](https://github.com/unjs/unbuild/compare/v0.8.8...v0.8.9) (2022-08-18)

### Bug Fixes

- **rollup:** 移除错误上下文 ([67d1d38](https://github.com/unjs/unbuild/commit/67d1d38e976e5e72c79ac49155f0047c6a8ff0ee))

### [0.8.8](https://github.com/unjs/unbuild/compare/v0.8.7...v0.8.8) (2022-08-11)

### Bug Fixes

- **rollup:** 分离动态块与共享块名称 ([aaf8227](https://github.com/unjs/unbuild/commit/aaf8227692f5c11b93ed034d5528fb69f255601f))

### [0.8.7](https://github.com/unjs/unbuild/compare/v0.8.6...v0.8.7) (2022-08-10)

### Bug Fixes

- 包含所有文件以进行总大小报告 ([7bce76d](https://github.com/unjs/unbuild/commit/7bce76ddbc52151452c0bbc59b5d809850ed024c))

### [0.8.6](https://github.com/unjs/unbuild/compare/v0.8.5...v0.8.6) (2022-08-10)

### [0.8.5](https://github.com/unjs/unbuild/compare/v0.8.4...v0.8.5) (2022-08-10)

### Features

- `name` 选项默认为包名 ([c3979ab](https://github.com/unjs/unbuild/commit/c3979abde77cd7393d4c4e7fa231a3496923e4aa))
- **rollup:** 使用哈希块名称 ([850b013](https://github.com/unjs/unbuild/commit/850b013da4da6463be84b552889a507f9d6e1085))

### Bug Fixes

- **rollup:** 取消标记块名称为外部导入 ([59debad](https://github.com/unjs/unbuild/commit/59debad1cfb5a6fcb31f032b11d82ff11eafa519))

### [0.8.4](https://github.com/unjs/unbuild/compare/v0.8.3...v0.8.4) (2022-08-10)

### Bug Fixes

- **rollup:** 处理存根多个导出 ([f215525](https://github.com/unjs/unbuild/commit/f2155253e9a2cd9d33e552006d31acc9355b72e7))

### [0.8.3](https://github.com/unjs/unbuild/compare/v0.8.2...v0.8.3) (2022-08-10)

### Bug Fixes

- **rollup:** 转义存根导入路径 ([63a3c11](https://github.com/unjs/unbuild/commit/63a3c1163fa7bdd26cfbd9ea0cc06acf27919d3c))
- **rollup:** 修复存根类型提示 ([38d95be](https://github.com/unjs/unbuild/commit/38d95be7c9295052553c441a746ed78385d164fd))
- **rollup:** 规范化存根条目路径 ([f7272e0](https://github.com/unjs/unbuild/commit/f7272e09f866bf02372597a151c1b2f686f2cd5b))

### [0.8.2](https://github.com/unjs/unbuild/compare/v0.8.1...v0.8.2) (2022-08-10)

### Bug Fixes

- **rollup:** 修复存根导出解析问题 ([63961e4](https://github.com/unjs/unbuild/commit/63961e4009264d73763bea402728509e82bf0c13))

### [0.8.1](https://github.com/unjs/unbuild/compare/v0.8.0...v0.8.1) (2022-08-10)

### Bug Fixes

- 更新 mlly ([26bc33c](https://github.com/unjs/unbuild/commit/26bc33c8bbcff5a3e12a197deeb70acdf7c379ec))

## [0.8.0](https://github.com/unjs/unbuild/compare/v0.7.6...v0.8.0) (2022-08-10)

### ⚠ BREAKING CHANGES

- 始终为 `jiti` 启用 `esmResolve`（存根和配置）
- 在构建警告时退出代码 (1) (#98)

### Features

- 始终为 `jiti` 启用 `esmResolve`（存根和配置）([b87c8df](https://github.com/unjs/unbuild/commit/b87c8df9bbd27081bba00dfb43f9e75cb540990c))
- 在构建警告时退出代码 (1) ([#98](https://github.com/unjs/unbuild/issues/98)) ([ffc0d7c](https://github.com/unjs/unbuild/commit/ffc0d7c63f53e531eb66c6ea3d32cfe144ecd988))
- **rollup:** 在 esm 存根中生成命名导出 ([c9fce24](https://github.com/unjs/unbuild/commit/c9fce24d5ad1c987d469846715b668c855435280))

### [0.7.6](https://github.com/unjs/unbuild/compare/v0.7.5...v0.7.6) (2022-07-20)

### Bug Fixes

- **pkg:** 使用 `default` 导出条件以避免破坏性变更 ([858d35d](https://github.com/unjs/unbuild/commit/858d35de754dcc76f55e3ba8d01945be9c6e9bee)), 关闭 [#89](https://github.com/unjs/unbuild/issues/89)

### [0.7.5](https://github.com/unjs/unbuild/compare/v0.7.4...v0.7.5) (2022-07-20)

### Features

- 在加载 `build.config` 时启用 `esmResolve` ([#93](https://github.com/unjs/unbuild/issues/93)) ([c856812](https://github.com/unjs/unbuild/commit/c856812ef28ba2aac3d57030b4db087d0369cd6c))

### Bug Fixes

- **pkg:** 为导出添加类型字段 ([#89](https://github.com/unjs/unbuild/issues/89)) ([457f043](https://github.com/unjs/unbuild/commit/457f0434b43b9e16cbbe1b54c61bfc5dcaf666a6))
- 正确计算输出大小的字节数 ([#82](https://github.com/unjs/unbuild/issues/82)) ([1888978](https://github.com/unjs/unbuild/commit/1888978944ae3384585e7da54ba0a4c0f55e9eb2))

### [0.7.4](https://github.com/unjs/unbuild/compare/v0.7.3...v0.7.4) (2022-04-13)

### Bug Fixes

- **deps:** 更新 mlly ([c935845](https://github.com/unjs/unbuild/commit/c935845905cac9db007c6c3442557c6c84057460))

### [0.7.3](https://github.com/unjs/unbuild/compare/v0.7.2...v0.7.3) (2022-04-12)

### Bug Fixes

- 解析绝对路径到 jiti 以支持 pnpm ([#58](https://github.com/unjs/unbuild/issues/58)) ([81d6da7](https://github.com/unjs/unbuild/commit/81d6da7894533b020c6a2c4a5991eecce1824b18))
- **stub:** 在 windows 上使用 `file://` 协议 ([12a99c1](https://github.com/unjs/unbuild/commit/12a99c1fa2bb8ce9341cb9a62bd1faf8b8f265e0))
- 解决使用 pnpm 构建的问题 ([#57](https://github.com/unjs/unbuild/issues/57)) ([eb7da84](https://github.com/unjs/unbuild/commit/eb7da84b5665ef11d1942ec7c70820d46d20f905))

### [0.7.2](https://github.com/unjs/unbuild/compare/v0.7.1...v0.7.2) (2022-03-25)

### Bug Fixes

- 恢复默认外部依赖中的内置模块 ([0b808c6](https://github.com/unjs/unbuild/commit/0b808c603d1686afe8352a7e279d6c254b62a29c))

### [0.7.1](https://github.com/unjs/unbuild/compare/v0.7.0...v0.7.1) (2022-03-25)

### Bug Fixes

- 将 `builtins` 和 `node:` 前缀添加到外部依赖 ([2af233d](https://github.com/unjs/unbuild/commit/2af233d16797ffdf331c3c311b874d41ab75dac8))

## [0.7.0](https://github.com/unjs/unbuild/compare/v0.6.9...v0.7.0) (2022-03-09)

### ⚠ BREAKING CHANGES

- 更新所有依赖

### Features

- 使 rollup-plugin-dts 选项可配置 ([#52](https://github.com/unjs/unbuild/issues/52)) ([e710503](https://github.com/unjs/unbuild/commit/e710503cda58a2691a6ed04abe91c346dae66d21))
- 更新所有依赖 ([fc7c164](https://github.com/unjs/unbuild/commit/fc7c1646f13adbc3fcaa9397e25951d39fb5dc21))

### [0.6.9](https://github.com/unjs/unbuild/compare/v0.6.8...v0.6.9) (2022-01-27)

### Features

- 允许 peerDeps 作为导入入口点 ([#43](https://github.com/unjs/unbuild/issues/43)) ([755981d](https://github.com/unjs/unbuild/commit/755981dc98a17898ab45d6d794eac3023b7d0298))

### [0.6.8](https://github.com/unjs/unbuild/compare/v0.6.7...v0.6.8) (2022-01-21)

### Bug Fixes

- **rollup:** 确保输出子目录存在 ([#40](https://github.com/unjs/unbuild/issues/40)) ([b964655](https://github.com/unjs/unbuild/commit/b96465550f89b9d0a1354b7ed315659dfa653917))

### [0.6.7](https://github.com/unjs/unbuild/compare/v0.6.6...v0.6.7) (2021-12-14)

### Features

- **rollup:** 替换和每个插件配置 ([6d185b2](https://github.com/unjs/unbuild/commit/6d185b260ce40099380fed5f1dd9d123c2459cf0))

### [0.6.6](https://github.com/unjs/unbuild/compare/v0.6.5...v0.6.6) (2021-12-14)

### Bug Fixes

- 更新 mkdist ([46272a1](https://github.com/unjs/unbuild/commit/46272a1339763116cdb8366b655f5a0c3421dd4e))

### [0.6.5](https://github.com/unjs/unbuild/compare/v0.6.4...v0.6.5) (2021-12-14)

### Bug Fixes

- 修复嵌套配置类型为可选 ([d48e0ac](https://github.com/unjs/unbuild/commit/d48e0ac48eb460daacb51843078cee73993c8243))

### [0.6.4](https://github.com/unjs/unbuild/compare/v0.6.3...v0.6.4) (2021-12-14)

### Features

- 自动配置预设 ([#30](https://github.com/unjs/unbuild/issues/30)) ([fe1ac94](https://github.com/unjs/unbuild/commit/fe1ac940d6c3617e8d9679a7f458c991c69eaafa))
- 解析 tsx 和 jsx 文件 ([#31](https://github.com/unjs/unbuild/issues/31)) ([03d7056](https://github.com/unjs/unbuild/commit/03d705617177ef0efbab0f0b6a5c6b7bb3f062b5))
- 支持别名和 esbuild 配置 ([#29](https://github.com/unjs/unbuild/issues/29)) ([b0b09e0](https://github.com/unjs/unbuild/commit/b0b09e04b35487090109e2a76e6b9b3ef3e449ff))
- 验证构建输出与 `package.json` ([#33](https://github.com/unjs/unbuild/issues/33)) ([c9ce0b0](https://github.com/unjs/unbuild/commit/c9ce0b0bc5e1e38734c72393f15cd28516703e19))

### Bug Fixes

- 外部 peerDependencies ([#32](https://github.com/unjs/unbuild/issues/32)) ([ba82fcb](https://github.com/unjs/unbuild/commit/ba82fcb5dd84dfdf3b3ab5e435e0c269c8659e0c))

### [0.6.3](https://github.com/unjs/unbuild/compare/v0.6.2...v0.6.3) (2021-12-03)

### Bug Fixes

- shebang 支持 ([#28](https://github.com/unjs/unbuild/issues/28)) ([cb8c4a2](https://github.com/unjs/unbuild/commit/cb8c4a2b65f5eecdb8cef6fd8dab092e3e4a72ab))

### [0.6.2](https://github.com/unjs/unbuild/compare/v0.6.1...v0.6.2) (2021-12-03)

### Features

- shebang 支持 ([12ccc15](https://github.com/unjs/unbuild/commit/12ccc15d42a360995280aec057e44cb1bfba0c87)), 关闭 [#27](https://github.com/unjs/unbuild/issues/27)

### [0.6.1](https://github.com/unjs/unbuild/compare/v0.6.0...v0.6.1) (2021-12-03)

### Features

- 允许程序化 inputConfig ([9493837](https://github.com/unjs/unbuild/commit/9493837636f203657d5166eba277eee83e959e21))

### Bug Fixes

- `hooks` 类型在配置中应该是部分的 ([62fd953](https://github.com/unjs/unbuild/commit/62fd9534bb82b69bd97091ff45a9947546e18d9a))
- 注册程序化钩子 ([867ebc5](https://github.com/unjs/unbuild/commit/867ebc52dd7654cb0e41a61d6833461c178d2a28))
- 相对于 rootDir 解析 outDir ([ba18055](https://github.com/unjs/unbuild/commit/ba18055a42a939a692e063cb95ad18f559bbb5c4))
- 如果代码不是 `MODULE_NOT_FOUND` 则显示错误 ([82d9432](https://github.com/unjs/unbuild/commit/82d9432ae29bc61459b71b3809868c8b6af26946))
- 对 package.json 使用 tryRequire ([31ab840](https://github.com/unjs/unbuild/commit/31ab840c56ca807577082d8216bee87ef23d977f))

## [0.6.0](https://github.com/unjs/unbuild/compare/v0.5.13...v0.6.0) (2021-12-03)

### ⚠ BREAKING CHANGES

- 提取 rollup 特定的全局选项

### Features

- `mkdist:` 钩子 ([46f8b96](https://github.com/unjs/unbuild/commit/46f8b966242f06a9fc8f321795c4dc9c8ea32b5c))
- `rollup:` 钩子 ([43cb0da](https://github.com/unjs/unbuild/commit/43cb0da484380d9208bd28a0f39bbcb6ae8ae113))
- 自动外部 peerDeps ([#25](https://github.com/unjs/unbuild/issues/25)) ([f629d74](https://github.com/unjs/unbuild/commit/f629d747c2e525cc21416fe177dd243417276be0))
- 基本预设支持 ([1c0f772](https://github.com/unjs/unbuild/commit/1c0f772259a4216e5f3e922144312b3d3cc5b7aa))
- 支持 `build:before` 和 `build:after` 钩子 ([c834e56](https://github.com/unjs/unbuild/commit/c834e56765510346f2c2901176cf09a0e3b1a39f))
- 支持 `unbuild` 键从 `package.json` ([ee16f56](https://github.com/unjs/unbuild/commit/ee16f56e9927c2c61fbee8db8e8c369b9e066902))
- untyped 钩子 ([e5ddb8e](https://github.com/unjs/unbuild/commit/e5ddb8ed0542e3a18be21090993392a200d529dc))

### Bug Fixes

- **stub:** 重新导出 `default` 在 dts 存根中 ([#26](https://github.com/unjs/unbuild/issues/26)) ([468347f](https://github.com/unjs/unbuild/commit/468347f39e9c270c865975b3bde46dbd753d94f2))

- 提取 rollup 特定的全局选项 ([0dfb39f](https://github.com/unjs/unbuild/commit/0dfb39fcdf90a5842ffd56440860ef25b058cdb4))

### [0.5.13](https://github.com/unjs/unbuild/compare/v0.5.12...v0.5.13) (2021-11-18)

### Features

- 升级到 untyped 0.3.x ([a7f50b8](https://github.com/unjs/unbuild/commit/a7f50b8e292a06998197b739de1af67dfc061c40))

### [0.5.12](https://github.com/unjs/unbuild/compare/v0.5.11...v0.5.12) (2021-11-18)

### Features

- 原始导入支持 ([0af3032](https://github.com/unjs/unbuild/commit/0af30328571e4d9864211e52fa0bb2f4542571f3))

### Bug Fixes

- 去默认 rollup-plugin-esbuild (解决 [#23](https://github.com/unjs/unbuild/issues/23)) ([e88fc72](https://github.com/unjs/unbuild/commit/e88fc72b0b18f2041ec0501db5402625079e62cf))

### [0.5.11](https://github.com/unjs/unbuild/compare/v0.5.10...v0.5.11) (2021-10-22)

### Bug Fixes

- 允许在类型中使用 cjs 扩展名 ([e878d1d](https://github.com/unjs/unbuild/commit/e878d1d4fb8ab808367df52e2a536db1da104c68))

### [0.5.10](https://github.com/unjs/unbuild/compare/v0.5.9...v0.5.10) (2021-10-21)

### Bug Fixes

- **rollup:** 使用 cjs 兼容的 json 导出 ([06d7b9d](https://github.com/unjs/unbuild/commit/06d7b9d2aedbb75d56a9e11bc31fd2ee0551a09d)), 关闭 [nuxt/framework#1335](https://github.com/nuxt/framework/issues/1335)

### [0.5.9](https://github.com/unjs/unbuild/compare/v0.5.8...v0.5.9) (2021-10-21)

### Features

- 使用 json 插件允许树摇 ([562e4d1](https://github.com/unjs/unbuild/commit/562e4d1110d3d0675f5205874f5088cbaa3dc3d6))

### [0.5.8](https://github.com/unjs/unbuild/compare/v0.5.7...v0.5.8) (2021-10-20)

### [0.5.7](https://github.com/unjs/unbuild/compare/v0.5.6...v0.5.7) (2021-10-13)

### [0.5.6](https://github.com/unjs/unbuild/compare/v0.5.5...v0.5.6) (2021-10-01)

### Features

- cjsBridge 和 emitCJS ([74a64c1](https://github.com/unjs/unbuild/commit/74a64c100a983ba5965c3177194261fd5d595b7d))

### [0.5.5](https://github.com/unjs/unbuild/compare/v0.5.4...v0.5.5) (2021-09-29)

### Bug Fixes

- **rollup:** 不要忽略内置的 require 以转换为 import ([00c6b21](https://github.com/unjs/unbuild/commit/00c6b2103168793c359e2e1fcf18e45ce064982c))

### [0.5.4](https://github.com/unjs/unbuild/compare/v0.5.3...v0.5.4) (2021-09-21)

### [0.5.3](https://github.com/unjs/unbuild/compare/v0.5.2...v0.5.3) (2021-09-21)

### Bug Fixes

- 为 esm 存根重新启用 interopDefault ([079bb51](https://github.com/unjs/unbuild/commit/079bb51b6e985e989f61ca58234142cdef45bca8))

### [0.5.2](https://github.com/unjs/unbuild/compare/v0.5.1...v0.5.2) (2021-09-21)

### Bug Fixes

- 避免为 esm 存根使用 interopDefault ([6a36080](https://github.com/unjs/unbuild/commit/6a360801afbf04d3889d2abe8acfac6b709fc094))

### [0.5.1](https://github.com/unjs/unbuild/compare/v0.5.0...v0.5.1) (2021-09-21)

### Bug Fixes

- **rollup:** 为 jiti 存根添加 `interopDefault` ([b1bf926](https://github.com/unjs/unbuild/commit/b1bf9266413bed041ef38693ef735ce754955895))

## [0.5.0](https://github.com/unjs/unbuild/compare/v0.4.2...v0.5.0) (2021-09-20)

### ⚠ BREAKING CHANGES

- 使用 `.cjs` 扩展名

### Features

- 使用 `.cjs` 扩展名 ([a1c8c0f](https://github.com/unjs/unbuild/commit/a1c8c0fb9d93dad57e876e3876e91854cb321612))

### Bug Fixes

- **pkg:** 使用显式的 .cjs 扩展名 ([909a539](https://github.com/unjs/unbuild/commit/909a5395714525a883cf1d9f91b9f7c4b3f1621a))
- **rollup:** 用 jiti 存根以支持 typescript ([6bab21f](https://github.com/unjs/unbuild/commit/6bab21f366600d071a0a182d88968023380ff3ec))

### [0.4.2](https://github.com/unjs/unbuild/compare/v0.4.1...v0.4.2) (2021-08-09)

### Bug Fixes

- **stub:** 在 windows 上使用 junction 链接 ([56aaf4b](https://github.com/unjs/unbuild/commit/56aaf4b9101b708015cc5c38cdaf11c598c5bf77))

### [0.4.1](https://github.com/unjs/unbuild/compare/v0.4.0...v0.4.1) (2021-07-29)

## [0.4.0](https://github.com/unjs/unbuild/compare/v0.3.2...v0.4.0) (2021-07-22)

### ⚠ BREAKING CHANGES

- 升级 `untyped` (#14)

- 升级 `untyped` ([#14](https://github.com/unjs/unbuild/issues/14)) ([caa57c9](https://github.com/unjs/unbuild/commit/caa57c931e652ac60c8cf8aa0f46739c6749e549))

### [0.3.2](https://github.com/unjs/unbuild/compare/v0.3.1...v0.3.2) (2021-07-08)

### Bug Fixes

- 不要在 windows 上为每个 src 文件发出警告 ([#10](https://github.com/unjs/unbuild/issues/10)) ([e4d18aa](https://github.com/unjs/unbuild/commit/e4d18aa020533810dc297acda923a4edcfce9114))

### [0.3.1](https://github.com/unjs/unbuild/compare/v0.3.0...v0.3.1) (2021-06-16)

### Bug Fixes

- 将 esbuild 目标更改为 es2019 ([a91ec26](https://github.com/unjs/unbuild/commit/a91ec26abef272a30e94f0568b0004cf9351c19c))

## [0.3.0](https://github.com/unjs/unbuild/compare/v0.2.3...v0.3.0) (2021-05-24)

### ⚠ BREAKING CHANGES

- 更新依赖

- 更新依赖 ([293dd7f](https://github.com/unjs/unbuild/commit/293dd7fc4383b5608dc09a20359840369030142e))

### [0.2.3](https://github.com/unjs/unbuild/compare/v0.2.2...v0.2.3) (2021-04-23)

### Features

- 将 ext 选项传递给 mkdist ([2c9a513](https://github.com/unjs/unbuild/commit/2c9a513014bab7d5b0cab67e6952647c085edf11))

### [0.2.2](https://github.com/unjs/unbuild/compare/v0.2.1...v0.2.2) (2021-04-21)

### Bug Fixes

- **mkdist:** 在存根之前删除目录 ([1ca50a4](https://github.com/unjs/unbuild/commit/1ca50a499f692f9d0cfdac4b6384836fb292af93))

### [0.2.1](https://github.com/unjs/unbuild/compare/v0.2.0...v0.2.1) (2021-04-21)

### Bug Fixes

- 避免在 dist 中出现重复名称 ([cbc8f55](https://github.com/unjs/unbuild/commit/cbc8f55cbdd2df29d328a44b773118ec6e00a079))

## [0.2.0](https://github.com/unjs/unbuild/compare/v0.1.13...v0.2.0) (2021-04-21)

### ⚠ BREAKING CHANGES

- 支持每个条目的 outDir

### Features

- 支持每个条目的 outDir ([5bb7ac3](https://github.com/unjs/unbuild/commit/5bb7ac384381c08b896c346fde94ca69fe704412))

### Bug Fixes

- 启用声明并导出 defineBuildConfig ([0e7d62b](https://github.com/unjs/unbuild/commit/0e7d62ba1fcf8dffa7932e0df66ccfee658ea069))

### [0.1.13](https://github.com/unjs/unbuild/compare/v0.1.12...v0.1.13) (2021-04-16)

### Bug Fixes

- rollup 配置修复（内联相关）([ae8a3d3](https://github.com/unjs/unbuild/commit/ae8a3d31438f1ea5b1f006a050e94fe335646cf3))

### [0.1.12](https://github.com/unjs/unbuild/compare/v0.1.11...v0.1.12) (2021-04-09)

### Features

- inlineDependencies 选项 ([9f320a1](https://github.com/unjs/unbuild/commit/9f320a17b567c18d3b9212481ae3da4fd06ea1c9))

### [0.1.11](https://github.com/unjs/unbuild/compare/v0.1.10...v0.1.11) (2021-04-09)

### Features

- declaration 选项生成类型 ([936478a](https://github.com/unjs/unbuild/commit/936478a0c6c36373a111a01b9c6e4eb2438e6ed6))

### [0.1.10](https://github.com/unjs/unbuild/compare/v0.1.9...v0.1.10) (2021-04-09)

### Bug Fixes

- 将包本身从外部依赖中排除 ([617a9f9](https://github.com/unjs/unbuild/commit/617a9f98f233e5a5c9764aa3e7802ef374c74944))

### [0.1.9](https://github.com/unjs/unbuild/compare/v0.1.8...v0.1.9) (2021-04-09)

### Bug Fixes

- **pkg:** 将 typescript 移动到 dependencies ([51cd53b](https://github.com/unjs/unbuild/commit/51cd53b836947e35da2639a2ee1602b6aa122499))

### [0.1.8](https://github.com/unjs/unbuild/compare/v0.1.7...v0.1.8) (2021-04-09)

### Bug Fixes

- **rollup:** 为 dts 设置 respectExternal 选项 ([a596fa3](https://github.com/unjs/unbuild/commit/a596fa333d78178d41a4e7ad0cd0114f3af9cedb))

### [0.1.7](https://github.com/unjs/unbuild/compare/v0.1.6...v0.1.7) (2021-04-09)

### Bug Fixes

- **pkg:** 直接添加 typescript 依赖以实现独立使用 ([adeda2f](https://github.com/unjs/unbuild/commit/adeda2f7b1b6627359316f1fb47afcb1a6119827))

### [0.1.6](https://github.com/unjs/unbuild/compare/v0.1.5...v0.1.6) (2021-04-09)

### Bug Fixes

- **pkg:** 指定 peerDependencies ([71e8994](https://github.com/unjs/unbuild/commit/71e8994cbb5d17693e94d9d93073b2d2b9011a89))

### [0.1.5](https://github.com/unjs/unbuild/compare/v0.1.4...v0.1.5) (2021-04-09)

### Bug Fixes

- 确保链接的父目录存在 ([87e75b3](https://github.com/unjs/unbuild/commit/87e75b35c380a65eaa05e30adce2d2a675340216))

### [0.1.4](https://github.com/unjs/unbuild/compare/v0.1.3...v0.1.4) (2021-04-09)

### Bug Fixes

- 使用 mkdirp ([c54e393](https://github.com/unjs/unbuild/commit/c54e393ea3512b837f64dcf7c55507e0df9d3de1))

### [0.1.3](https://github.com/unjs/unbuild/compare/v0.1.2...v0.1.3) (2021-04-09)

### Bug Fixes

- 更新依赖并使用 interopDefault ([6b0f39a](https://github.com/unjs/unbuild/commit/6b0f39a8270ed1927d806ab04ce9fc160c3353f6))

### [0.1.2](https://github.com/unjs/unbuild/compare/v0.1.1...v0.1.2) (2021-04-09)

### Features

- 在存根期间将模块链接到自身 ([5a1f9cd](https://github.com/unjs/unbuild/commit/5a1f9cd7b574eaf0f8ca503ecf70b0ff35bfe23b))
- schema 加载器 ([e2388bb](https://github.com/unjs/unbuild/commit/e2388bb3b3d23b8fc9a9d9a8a2a4d62e981602c8))

### 0.1.1 (2021-04-07)
