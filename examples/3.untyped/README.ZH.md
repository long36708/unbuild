# Unbuild Untyped 示例

此示例演示了如何使用untyped构建器从运行时配置生成类型声明。

## 概述

untyped构建器用于从运行时JavaScript对象生成TypeScript类型定义。此示例展示了如何配置unbuild以使用untyped构建器从源代码创建模式类型定义。

## 主要特性

1. **Untyped构建器**：使用untyped构建器从运行时配置生成TypeScript类型定义。
2. **模式生成**：自动从源代码生成模式文件。
3. **运行时配置**：演示了如何处理具有类型安全的运行时配置。

## 文件结构

```
src/
└── index.ts      # 包含配置对象的主入口点
```

## 构建配置

`build.config.ts`定义了以下入口点：

1. `src/index.ts`：使用默认设置构建的主入口点
2. `{ builder: "untyped", input: "src/index.ts", outDir: "schema", name: "schema" }`：
   使用untyped构建器从源文件生成模式

## 导出配置

`package.json`定义了以下导出：

- `.` (主入口点)：
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

## 输出

构建后，`dist`目录将包含：

- `index.mjs`和`index.d.mts`（ESM格式）
- `index.cjs`和`index.d.cts`（CJS格式）

此外，还会生成一个`schema`目录，包含：

- `schema.d.ts`：从运行时配置生成的TypeScript定义
- `schema.mjs`：包含解析后配置的ESM模块
- `schema.cjs`：包含解析后配置的CJS模块

这演示了untyped构建器如何用于从运行时对象生成类型安全的配置，使在配置密集型应用程序中更容易维护类型安全。
