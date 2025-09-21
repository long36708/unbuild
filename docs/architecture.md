# unbuild 项目架构图

```mermaid
graph TD
    A[unbuild CLI] --> B[Build Configuration]
    A --> C[Build Context]

    B --> D[Build Entries]
    B --> E[Build Options]

    C --> F[BuildContext Object]
    C --> G[Build Hooks]

    F --> H[Rollup Builder]
    F --> I[Mkdist Builder]
    F --> J[Copy Builder]
    F --> K[Untyped Builder]

    H --> L[Rollup Plugins]
    H --> M[Rollup Config]
    H --> N[Rollup Build Process]

    L --> O[ESBuild Plugin]
    L --> P[CJS Plugin]
    L --> Q[JSON Plugin]
    L --> R[Raw Plugin]
    L --> S[Shebang Plugin]

    I --> T[Mkdist Process]

    J --> U[Copy Process]

    K --> V[Untyped Process]

    N --> W[Output Files]
    T --> W
    U --> W
    V --> W

    W --> X[Dist Directory]

    subgraph "Builders"
        H
        I
        J
        K
    end

    subgraph "Rollup Plugins"
        O
        P
        Q
        R
        S
    end

    style A fill:#f9f,stroke:#333
    style F fill:#bbf,stroke:#333
    style H fill:#bfb,stroke:#333
    style I fill:#bfb,stroke:#333
    style J fill:#bfb,stroke:#333
    style K fill:#bfb,stroke:#333
    style W fill:#fbb,stroke:#333
```

这个架构图展示了unbuild项目的主要组件和它们之间的关系：

1. **入口点**: unbuild CLI是整个构建系统的入口点
2. **配置层**: Build Configuration定义了构建条目和选项
3. **上下文层**: Build Context包含构建过程中的上下文信息
4. **构建器层**:
   - Rollup Builder: 主要的打包构建器
   - Mkdist Builder: 用于文件到文件的转译
   - Copy Builder: 用于复制文件
   - Untyped Builder: 用于类型生成
5. **插件层**: Rollup构建器使用的各种插件
6. **输出层**: 所有构建器的输出最终都汇聚到Dist目录
