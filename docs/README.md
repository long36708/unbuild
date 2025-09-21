# unbuild 架构文档

这个目录包含了unbuild项目的架构图，帮助理解项目的整体结构和组件关系。

## 架构图文件

1. [architecture.md](./architecture.md) - 高级架构图，展示了项目的主要组件和它们之间的关系
2. [detailed-architecture.md](./detailed-architecture.md) - 详细架构图，展示了完整的构建流程和各个阶段的详细信息
3. [component-relationships.md](./component-relationships.md) - 组件关系图，展示了各个模块之间的依赖关系

## 图表说明

所有的架构图都使用Mermaid语法编写，可以在支持Mermaid的编辑器中查看，例如：

- VS Code with Mermaid extension
- GitHub (直接在Markdown中渲染)
- Mermaid Live Editor (https://mermaid.live)

## 架构概览

unbuild项目主要由以下几个核心部分组成：

1. **CLI**: 命令行接口，是用户与构建系统交互的入口点
2. **Configuration**: 构建配置系统，处理用户配置和默认配置的合并
3. **Context**: 构建上下文，包含构建过程中需要的所有信息
4. **Builders**: 构建器集合，包括Rollup、Mkdist、Copy和Untyped构建器
5. **Plugins**: 插件系统，特别是Rollup插件扩展了构建功能
6. **Utils**: 工具函数集合，提供通用的辅助功能
7. **Types**: TypeScript类型定义，确保类型安全
8. **Validation**: 验证系统，确保构建输出的正确性

这些架构图可以帮助开发者更好地理解unbuild的工作原理，便于维护和扩展项目。
