# 项目三方依赖分析

## 生产环境依赖 (dependencies)

### Rollup 相关依赖

| 依赖包 | 版本 | 作用 |
|-------|------|------|
| @rollup/plugin-alias | ^5.1.1 | Rollup别名插件，用于解析模块别名 |
| @rollup/plugin-commonjs | ^28.0.6 | Rollup CommonJS 插件，将 CommonJS 模块转换为 ES6 模块 |
| @rollup/plugin-json | ^6.1.0 | Rollup JSON 插件，允许 Rollup 处理 JSON 文件 |
| @rollup/plugin-node-resolve | ^16.0.1 | Rollup Node 解析插件，用于解析 node_modules 中的第三方模块 |
| @rollup/plugin-replace | ^6.0.2 | Rollup 替换插件，在打包时替换代码中的指定内容 |
| @rollup/pluginutils | ^5.2.0 | Rollup 工具库，提供常用的 Rollup 插件开发工具 |

### 核心框架和工具

| 依赖包 | 版本 | 作用 |
|-------|------|------|
| citty | ^0.1.6 | 命令行界面工具，用于创建 CLI 应用程序 |
| consola | ^3.4.2 | 控制台日志记录工具，提供美观的日志输出 |
| defu | ^6.1.4 | 深度合并配置对象的工具 |
| esbuild | ^0.25.9 | 极速 JavaScript 打包和压缩工具 |
| fix-dts-default-cjs-exports | ^1.0.1 | 修复 TypeScript 声明文件中 CommonJS 默认导出的问题 |
| hookable | ^5.5.3 | 可挂钩的事件系统，用于实现插件架构 |
| jiti | ^2.5.1 | 即时编译和导入 TypeScript/JavaScript 文件 |
| magic-string | ^0.30.18 | 高效处理字符串修改的工具，常用于代码转换 |
| mkdist | ^2.3.0 | 构建工具，用于将源码转换为目标代码 |
| mlly | ^1.8.0 | 现代 ECMAScript 模块工具库 |
| pathe | ^2.0.3 | 跨平台路径处理工具 |
| pkg-types | ^2.3.0 | 包类型定义工具 |
| pretty-bytes | ^7.0.1 | 将字节数格式化为人类可读的字符串 |
| rollup | ^4.50.0 | 模块打包工具，用于将小块代码编译成大块复杂的应用程序 |
| rollup-plugin-dts | ^6.2.3 | Rollup 插件，用于生成 TypeScript 声明文件 |
| scule | ^1.3.0 | 字符串转换工具，如驼峰命名转换 |
| tinyglobby | ^0.2.14 | 快速的 glob 文件匹配工具 |
| untyped | ^2.0.0 | 用于从 JavaScript 对象生成 TypeScript 类型定义 |

## 开发环境依赖 (devDependencies)

| 依赖包 | 版本 | 作用 |
|-------|------|------|
| @babel/plugin-transform-class-properties | ^7.27.1 | Babel 插件，用于转换类属性语法 |
| @types/node | ^24.3.0 | Node.js 的 TypeScript 类型定义 |
| @vitest/coverage-v8 | ^3.2.4 | Vitest 测试覆盖率工具 |
| automd | ^0.4.0 | 自动化 Markdown 文档生成工具 |
| changelogen | ^0.6.2 | 自动生成变更日志的工具 |
| eslint | ^9.34.0 | JavaScript 代码检查工具 |
| eslint-config-unjs | ^0.5.0 | UnJS 项目的 ESLint 配置 |
| prettier | ^3.6.2 | 代码格式化工具 |
| typescript | ^5.9.2 | TypeScript 编译器 |
| vitest | ^3.2.4 | 基于 Vite 的测试框架 |

## 对等依赖 (peerDependencies)

| 依赖包 | 版本 | 作用 |
|-------|------|------|
| typescript | ^5.9.2 | TypeScript 编译器（可选） |

---

## 主要依赖的API使用情况

### Rollup 生态

1. **rollup**
   - 作为核心打包工具，负责将模块打包成最终的输出文件
   - 使用 `rollup` 函数创建打包实例
   - 使用 `write` 方法输出打包结果

2. **@rollup/plugin-alias**
   - 在配置中通过 `alias` 选项设置模块别名
   - 帮助解析项目中的路径别名

3. **@rollup/plugin-commonjs**
   - 将 CommonJS 模块转换为 ES6 模块，以便 Rollup 可以处理
   - 在配置中通过 `commonjs` 选项启用

4. **@rollup/plugin-json**
   - 允许直接导入 JSON 文件
   - 在配置中通过 `json` 选项启用

5. **@rollup/plugin-node-resolve**
   - 解析 node_modules 中的第三方模块
   - 在配置中通过 `resolve` 选项启用

6. **@rollup/plugin-replace**
   - 在打包时替换代码中的指定内容
   - 在配置中通过 `replace` 选项启用

7. **@rollup/pluginutils**
   - 提供常用的 Rollup 插件开发工具
   - 使用 `createFilter` 创建文件过滤器

### 核心工具

1. **citty**
   - 用于创建命令行界面
   - 定义命令行参数和选项
   - 处理命令行输入

2. **consola**
   - 用于输出日志信息
   - 提供不同级别的日志输出（info, warn, error等）
   - 格式化输出信息

3. **defu**
   - 用于深度合并配置对象
   - 合并默认配置和用户配置

4. **esbuild**
   - 用于快速打包和压缩 JavaScript 代码
   - 在 Rollup 插件中作为转换工具使用

5. **hookable**
   - 实现插件架构的事件系统
   - 允许注册和调用钩子函数
   - 提供插件扩展能力

6. **jiti**
   - 即时编译和导入 TypeScript/JavaScript 文件
   - 用于加载配置文件和源码

7. **magic-string**
   - 处理字符串修改，常用于代码转换
   - 生成源码映射(source map)

8. **mkdist**
   - 用于将源码转换为目标代码
   - 处理非 JavaScript 文件的构建

9. **mlly**
   - 处理 ECMAScript 模块
   - 解析模块路径和导出信息

10. **pathe**
    - 跨平台路径处理
    - 提供统一的路径操作API

11. **pkg-types**
    - 处理包类型定义
    - 提供 package.json 的类型信息

12. **untyped**
    - 从 JavaScript 对象生成 TypeScript 类型定义
    - 处理配置对象的类型生成

### 开发工具

1. **vitest**
   - 用于单元测试
   - 提供测试运行环境

2. **eslint/prettier**
   - 用于代码质量和格式检查
   - 保证代码风格一致性

3. **typescript**
   - 提供类型检查
   - 编译 TypeScript 代码
