# unbuild 详细架构图

```mermaid
graph TD
    A[unbuild CLI] --> B[Command Parsing]
    B --> C[Build Configuration Loading]
    C --> D[Configuration Merging]

    D --> E[Build Context Creation]
    E --> F[BuildContext Object]

    F --> G[Build Process Initialization]
    G --> H[Entry Point Analysis]

    H --> I[Auto Entry Detection]
    H --> J[Manual Entry Configuration]

    I --> K[Source Directory Scanning]
    J --> L[Entry Point Validation]

    K --> M[Infer Entries]
    L --> M

    M --> N[Build Entry List]

    N --> O[Parallel Build Execution]

    O --> P[Rollup Builder]
    O --> Q[Mkdist Builder]
    O --> R[Copy Builder]
    O --> S[Untyped Builder]

    P --> T[Rollup Configuration Setup]
    T --> U[Alias Resolution]
    T --> V[External Dependencies Detection]

    U --> W[Rollup Options Generation]
    V --> W

    W --> X[Rollup Build Process]
    X --> Y[Module Bundling]
    Y --> Z[Chunk Generation]

    Z --> AA[Output Processing]
    AA --> AB[File Writing]

    Q --> AC[Mkdist Configuration]
    AC --> AD[Mkdist Process]
    AD --> AE[File Transpilation]
    AE --> AF[Output Writing]

    R --> AG[Copy Configuration]
    AG --> AH[Copy Process]
    AH --> AI[File Copying]

    S --> AJ[Untyped Configuration]
    AJ --> AK[Untyped Process]
    AK --> AL[Schema Processing]
    AL --> AM[Type Declaration Generation]

    AB --> AN[Dist Directory]
    AF --> AN
    AI --> AN
    AM --> AN

    AN --> AO[Post Build Validation]
    AO --> AP[Dependency Validation]
    AO --> AQ[Package Validation]

    AP --> AR[Validation Report]
    AQ --> AR

    AR --> AS[Build Completion]

    subgraph "Configuration Phase"
        B
        C
        D
        E
    end

    subgraph "Context & Entry Analysis"
        F
        G
        H
        I
        J
        K
        L
        M
        N
    end

    subgraph "Build Execution"
        O
        P
        Q
        R
        S
    end

    subgraph "Rollup Builder Details"
        T
        U
        V
        W
        X
        Y
        Z
        AA
        AB
    end

    subgraph "Mkdist Builder Details"
        AC
        AD
        AE
        AF
    end

    subgraph "Copy Builder Details"
        AG
        AH
        AI
    end

    subgraph "Untyped Builder Details"
        AJ
        AK
        AL
        AM
    end

    subgraph "Output & Validation"
        AN
        AO
        AP
        AQ
        AR
        AS
    end

    style A fill:#f9f,stroke:#333
    style F fill:#bbf,stroke:#333
    style O fill:#fbf,stroke:#333
    style AN fill:#fbb,stroke:#333
    style AS fill:#bfb,stroke:#333
```

这个详细的架构图展示了unbuild项目的完整构建流程：

1. **配置阶段**:
   - 命令解析
   - 构建配置加载
   - 配置合并

2. **上下文和入口点分析**:
   - 构建上下文创建
   - 入口点分析（自动检测或手动配置）
   - 源目录扫描和入口推断

3. **构建执行**:
   - 并行构建执行
   - Rollup构建器
   - Mkdist构建器
   - Copy构建器
   - Untyped构建器

4. **Rollup构建器详细流程**:
   - Rollup配置设置
   - 别名解析和外部依赖检测
   - Rollup选项生成
   - 模块打包和块生成
   - 输出处理和文件写入

5. **其他构建器流程**:
   - Mkdist: 文件转译和输出写入
   - Copy: 文件复制
   - Untyped: 模式处理和类型声明生成

6. **输出和验证**:
   - 所有构建器输出到Dist目录
   - 构建后验证（依赖验证和包验证）
   - 构建完成
