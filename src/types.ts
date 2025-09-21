import type { PackageJson } from "pkg-types";
import type { Hookable } from "hookable";
import type { RollupOptions as _RollupOptions, WatcherOptions } from "rollup";
import type { Jiti, JitiOptions } from "jiti";
import type {
  RollupBuildEntry,
  RollupBuildOptions,
  RollupHooks,
} from "./builders/rollup/types";
import type { MkdistBuildEntry, MkdistHooks } from "./builders/mkdist/types";
import type { CopyBuildEntry, CopyHooks } from "./builders/copy/types";
import type { UntypedBuildEntry, UntypedHooks } from "./builders/untyped/types";

/**
 * 基础构建条目接口
 */
export interface BaseBuildEntry {
  /**
   * 构建器类型
   */
  builder?: "untyped" | "rollup" | "mkdist" | "copy";

  /**
   * 输入路径
   */
  input: string;

  /**
   * 条目名称
   */
  name?: string;

  /**
   * 输出目录
   */
  outDir?: string;

  /**
   * 声明文件生成选项
   */
  declaration?: "compatible" | "node16" | boolean;
}

/** 构建器类型 */
export type {
  RollupBuildEntry,
  RollupBuildOptions,
  RollupOptions,
} from "./builders/rollup/types";
export type { MkdistBuildEntry } from "./builders/mkdist/types";
export type { CopyBuildEntry } from "./builders/copy/types";
export type {
  UntypedBuildEntry,
  UntypedOutput,
  UntypedOutputs,
} from "./builders/untyped/types";

/**
 * 构建条目类型，可以是基础构建条目或各种特定构建器的构建条目
 */
export type BuildEntry =
  | BaseBuildEntry
  | RollupBuildEntry
  | UntypedBuildEntry
  | MkdistBuildEntry
  | CopyBuildEntry;

/**
 * 构建选项接口
 */
export interface BuildOptions {
  /**
   * 项目名称
   */
  name: string;

  /**
   * 项目根目录
   */
  rootDir: string;

  /**
   * 构建条目数组
   */
  entries: BuildEntry[];

  /**
   * 在构建前是否清理输出目录
   */
  clean: boolean;

  /**
   * @experimental
   * 是否生成source map文件
   */
  sourcemap: boolean;

  /**
   * 是否生成声明文件
   * * `compatible` 表示 "src/index.ts" 将生成 "dist/index.d.mts", "dist/index.d.cts" 和 "dist/index.d.ts"
   * * `node16` 表示 "src/index.ts" 将生成 "dist/index.d.mts" 和 "dist/index.d.cts"
   * * `true` 等同于 `compatible`
   * * `false` 将禁用声明文件生成
   * * `undefined` 将根据 "package.json" 自动检测。如果 "package.json" 有 "types" 字段，则为 `"compatible"`，否则为 `false`
   */
  declaration?: "compatible" | "node16" | boolean;

  /**
   * 输出目录
   */
  outDir: string;

  /**
   * 是否使用JIT stubs进行构建
   * 了解更多: [stubbing](https://antfu.me/posts/publish-esm-and-cjs#stubbing)
   */
  stub: boolean;

  /**
   * 是否构建并主动监听文件变化
   *
   * @experimental 此功能是实验性的且不完整
   */
  watch: boolean;

  /**
   * 监听模式选项
   */
  watchOptions: WatcherOptions | undefined;

  /**
   * Stub选项，其中 [jiti](https://github.com/unjs/jiti)
   * 是一个 `Omit<JitiOptions, "transform" | "onError">` 类型的对象
   */
  stubOptions: {
    jiti: Omit<JitiOptions, "transform" | "onError">;
    absoluteJitiPath?: boolean;
  };

  /**
   * 用于指定哪些模块或库应被视为外部依赖项
   * 且不包含在最终构建产品中
   */
  externals: (string | RegExp)[];

  /**
   * 依赖项列表
   */
  dependencies: string[];

  /**
   * 对等依赖项列表
   */
  peerDependencies: string[];

  /**
   * 开发依赖项列表
   */
  devDependencies: string[];

  /**
   * 为模块导入创建别名，以便在代码中使用更简洁的路径引用模块
   * 允许您为模块路径指定别名
   */
  alias: { [find: string]: string };

  /**
   * 使用规则替换源代码中的文本
   */
  replace: { [find: string]: string };

  /**
   * 出现警告时是否终止构建过程
   */
  failOnWarn?: boolean;

  /**
   * [Rollup](https://rollupjs.org/configuration-options) 构建选项
   */
  rollup: RollupBuildOptions;

  /**
   * 同时运行不同类型的构建（untyped, mkdist, Rollup, copy）
   */
  parallel: boolean;
}

/**
 * 构建上下文接口
 */
export interface BuildContext {
  /**
   * 构建选项
   */
  options: BuildOptions;

  /**
   * package.json内容
   */
  pkg: PackageJson;

  /**
   * jiti实例
   */
  jiti: Jiti;

  /**
   * 构建条目数组
   */
  buildEntries: {
    /**
     * 条目路径
     */
    path: string;

    /**
     * 文件大小（字节）
     */
    bytes?: number;

    /**
     * 导出列表
     */
    exports?: string[];

    /**
     * chunks列表
     */
    chunks?: string[];

    /**
     * 是否为chunk
     */
    chunk?: boolean;

    /**
     * 模块信息数组
     */
    modules?: {
      /**
       * 模块ID
       */
      id: string;

      /**
       * 模块大小（字节）
       */
      bytes: number
    }[];
  }[];

  /**
   * 已使用的导入集合
   */
  usedImports: Set<string>;

  /**
   * 警告信息集合
   */
  warnings: Set<string>;

  /**
   * 钩子函数管理器
   */
  hooks: Hookable<BuildHooks>;
}

/**
 * 构建预设类型
 */
export type BuildPreset = BuildConfig | (() => BuildConfig);

/**
 * 深度部分类型工具
 */
type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

/**
 * 构建配置接口
 * 除了基础的 `entries`、`presets` 和 `hooks` 外，
 * 还包含 `BuildOptions` 的所有属性，除了 BuildOptions 的 `entries`
 */
export interface BuildConfig
  extends DeepPartial<Omit<BuildOptions, "entries">> {
  /**
   * 指定构建过程中的入口文件或入口模块
   */
  entries?: (BuildEntry | string)[];

  /**
   * 用于指定预设构建配置
   */
  preset?: string | BuildPreset;

  /**
   * 用于在构建过程中定义钩子函数，以便在特定构建阶段执行自定义操作
   * 此配置允许您在构建过程中插入自定义逻辑，以满足特定需求或执行额外操作
   */
  hooks?: Partial<BuildHooks>;
}

/**
 * 构建钩子接口
 * 继承自各种构建器的钩子接口
 */
export interface BuildHooks
  extends CopyHooks,
    UntypedHooks,
    MkdistHooks,
    RollupHooks {
  /**
   * 构建准备阶段钩子
   */
  "build:prepare": (ctx: BuildContext) => void | Promise<void>;

  /**
   * 构建开始前钩子
   */
  "build:before": (ctx: BuildContext) => void | Promise<void>;

  /**
   * 构建完成后钩子
   */
  "build:done": (ctx: BuildContext) => void | Promise<void>;
}

/**
 * 定义构建配置的辅助函数
 * @param config 构建配置或构建配置数组
 * @returns 构建配置数组
 */
export function defineBuildConfig(
  config: BuildConfig | BuildConfig[],
): BuildConfig[] {
  return (Array.isArray(config) ? config : [config]).filter(Boolean);
}

/**
 * 定义构建预设的辅助函数
 * @param preset 构建预设
 * @returns 构建预设
 */
export function definePreset(preset: BuildPreset): BuildPreset {
  return preset;
}
