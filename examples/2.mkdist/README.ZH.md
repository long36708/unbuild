# Unbuild Mkdist 示例

此示例演示了如何使用mkdist构建器从TypeScript生成ESM、CJS和DTS文件，使用文件夹作为入口点。

## 概述

mkdist构建器用于生成无捆绑的分发包，通过文件到文件的转译。此示例展示了如何配置unbuild以使用mkdist构建器构建具有不同输出格式的插件。

## 主要特性

1. **Mkdist构建器**：使用mkdist构建器进行文件到文件的转译。
2. **多种输出格式**：为插件生成ESM和CJS格式。
3. **通配符导出**：演示了如何在package.json中使用通配符导出插件目录。
4. **选择性声明生成**：展示了如何为ESM生成声明但不为CJS生成。

## 文件结构

```
src/
├── index.ts           # 主入口点
└── plugins/
    ├── vite.ts        # Vite插件
    └── webpack.ts     # Webpack插件
```

## 构建配置

`build.config.ts`定义了以下入口点：

1. `src/index.ts`：使用默认设置构建的主入口点
2. `src/plugins/`：以ESM格式构建的插件目录并生成声明
3. `src/plugins/`：以CJS格式构建的插件目录但不生成声明

## 导出配置

`package.json`定义了以下导出：

- `.` (主入口点)：
  - `import`：ESM格式及类型定义
  - `require`：CJS格式及类型定义
- `./plugins/*` (插件通配符)：
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
- `plugins/`目录包含：
  - `vite.mjs`和`vite.d.mts`（ESM格式）
  - `webpack.mjs`和`webpack.d.mts`（ESM格式）
  - `vite.cjs`（CJS格式，无声明）
  - `webpack.cjs`（CJS格式，无声明）

这演示了mkdist构建器如何用于处理整个目录并为不同用例生成不同的输出格式。
