# Unbuild 零配置示例

此示例演示了unbuild如何自动从[`package.json`](./package.json)中的`exports`字段推断构建配置。

## 概述

Unbuild自动从[`package.json`](./package.json)中的`exports`字段推断构建配置。

由于设置了3个`types`、`import`和`require`字段，构建会自动包含它们。

Unbuild还支持构建多个入口点。

## 主要特性

1. **零配置**：无需创建`build.config.ts`文件。Unbuild会自动从`package.json`文件中推断配置。
2. **多个入口点**：此示例展示了如何构建多个入口点（`index.ts`和`utils.ts`）及其不同的导出格式。
3. **双包支持**：该包支持ESM和CJS格式以及相应的类型定义。

## 文件结构

```
src/
├── index.ts      # 主入口点
└── utils.ts      # 工具函数
```

## 导出配置

`package.json`定义了以下导出：

- `.` (主入口点)：
  - `import`：ESM格式及类型定义
  - `require`：CJS格式及类型定义
- `./utils` (次要入口点)：
  - `import`：ESM格式及类型定义
  - `require`：CJS格式及类型定义

## 使用方法

1. 安装依赖：
   ```bash
   npm install
   ```

2. 构建项目：
   ```bash
   npm run build
   ```

3. 开发时可以使用存根模式：
   ```bash
   npm run build:stub
   ```

## 输出

构建后，`dist`目录将包含：

- `index.mjs`和`index.d.mts`（ESM格式）
- `index.cjs`和`index.d.cts`（CJS格式）
- `utils.mjs`和`utils.d.mts`（ESM格式）
- `utils.cjs`和`utils.d.cts`（CJS格式）

这演示了unbuild如何仅基于`package.json`配置自动生成ESM和CJS构建及其相应的TypeScript声明。
