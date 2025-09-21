import { relative } from "pathe";
import { watch as _rollupWatch } from "rollup";
import type { RollupOptions } from "../../types";
import consola from "consola";
import { colors } from "consola/utils";

/**
 * Rollup监听函数
 * @param rollupOptions Rollup选项
 */
export function rollupWatch(rollupOptions: RollupOptions): void {
  // 创建监听器
  const watcher = _rollupWatch(rollupOptions);

  // 获取输入文件列表
  let inputs: string[];
  if (Array.isArray(rollupOptions.input)) {
    inputs = rollupOptions.input;
  } else if (typeof rollupOptions.input === "string") {
    inputs = [rollupOptions.input];
  } else {
    inputs = Object.keys(rollupOptions.input || {});
  }

  // 显示开始监听的信息
  consola.info(
    `[unbuild] [rollup] Starting watchers for entries: ${inputs.map((input) => "./" + relative(process.cwd(), input)).join(", ")}`,
  );

  // 显示监听模式的警告信息
  consola.warn(
    "[unbuild] [rollup] Watch mode is experimental and may be unstable",
  );

  // 监听文件变化事件
  watcher.on("change", (id, { event }) => {
    consola.info(`${colors.cyan(relative(".", id))} was ${event}d`);
  });

  // 监听重启事件
  watcher.on("restart", () => {
    consola.info(colors.gray("[unbuild] [rollup] Rebuilding bundle"));
  });

  // 监听事件
  watcher.on("event", (event) => {
    // 如果事件代码为"END"，则显示重建完成的信息
    if (event.code === "END") {
      consola.success(colors.green("[unbuild] [rollup] Rebuild finished\n"));
    }
  });
}
