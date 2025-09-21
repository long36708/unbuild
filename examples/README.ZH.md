# unbuild 示例

这个目录包含了几个示例，演示了如何使用unbuild构建JavaScript/TypeScript项目。

## 示例

1. [零配置](./1.zero-config/) - 演示unbuild如何自动从`package.json`文件推断构建配置，而无需单独的构建配置文件。

2. [Mkdist](./2.mkdist/) - 展示如何使用mkdist构建器生成无捆绑的分发包，通过文件到文件的转译，特别适用于插件系统。

3. [Untyped](./3.untyped/) - 说明如何使用untyped构建器从运行时配置生成TypeScript类型定义。

## 概述

每个示例都是一个独立的项目，演示了unbuild的特定功能或使用场景：

- **零配置**：适用于可以依赖自动配置推断的简单项目。
- **Mkdist**：适用于需要处理整个目录文件而无需捆绑的项目。
- **Untyped**：适用于需要从运行时配置生成类型定义的项目。

## 使用方法

要尝试任何示例：

1. 导航到示例目录：
   ```bash
   cd examples/[example-name]
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 构建项目：
   ```bash
   npm run build
   ```

每个示例都包含详细的README，解释其特定功能和使用模式。
