# 三方依赖API使用详解

## Rollup 生态系统

### rollup

**主要API使用:**

1. `rollup(options)` - 核心打包函数
   ```javascript
   import { rollup } from 'rollup';
   const bundle = await rollup(rollupOptions);
   ```

2. `bundle.write(options)` - 输出打包结果
   ```javascript
   await bundle.write(outputOptions);
   ```

3. `bundle.generate(options)` - 在内存中生成打包结果
   ```javascript
   const { output } = await bundle.generate(outputOptions);
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/build.ts` 中作为核心打包工具使用
- 负责将模块打包成最终的输出文件

### @rollup/plugin-alias

**主要API使用:**

1. `alias(options)` - 创建别名插件实例
   ```javascript
   import alias from '@rollup/plugin-alias';
   const plugin = alias({
     entries: [
       { find: 'utils', replacement: './src/utils' }
     ]
   });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/config.ts` 中配置模块别名
- 帮助解析项目中的路径别名

### @rollup/plugin-commonjs

**主要API使用:**

1. `commonjs(options)` - 创建CommonJS插件实例
   ```javascript
   import commonjs from '@rollup/plugin-commonjs';
   const plugin = commonjs({
     include: 'node_modules/**'
   });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/config.ts` 中将 CommonJS 模块转换为 ES6 模块
- 使得 Rollup 能够处理 CommonJS 格式的第三方库

### @rollup/plugin-json

**主要API使用:**

1. `json(options)` - 创建JSON插件实例
   ```javascript
   import json from '@rollup/plugin-json';
   const plugin = json({
     compact: true
   });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/config.ts` 中允许直接导入 JSON 文件
- 处理项目中的 JSON 资源文件

### @rollup/plugin-node-resolve

**主要API使用:**

1. `nodeResolve(options)` - 创建Node解析插件实例
   ```javascript
   import { nodeResolve } from '@rollup/plugin-node-resolve';
   const plugin = nodeResolve({
     browser: true
   });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/config.ts` 中解析 node_modules 中的第三方模块
- 使得 Rollup 能够正确找到和打包第三方依赖

### @rollup/plugin-replace

**主要API使用:**

1. `replace(options)` - 创建替换插件实例
   ```javascript
   import replace from '@rollup/plugin-replace';
   const plugin = replace({
     'process.env.NODE_ENV': JSON.stringify('production')
   });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/config.ts` 中在打包时替换代码中的指定内容
- 用于环境变量替换和其他编译时变量替换

### @rollup/pluginutils

**主要API使用:**

1. `createFilter(include, exclude)` - 创建文件过滤器
   ```javascript
   import { createFilter } from '@rollup/pluginutils';
   const filter = createFilter(['**/*.js'], ['**/*.spec.js']);
   ```

2. `dataToEsm(data, options)` - 将数据转换为ESM模块
   ```javascript
   import { dataToEsm } from '@rollup/pluginutils';
   const code = dataToEsm({ version: '1.0.0' });
   ```

**在项目中的使用:**
- 在多个Rollup插件中用于创建文件过滤器
- 帮助插件确定哪些文件需要处理

## 核心工具库

### citty

**主要API使用:**

1. `defineCommand(options)` - 定义命令行指令
   ```javascript
   import { defineCommand } from 'citty';
   const command = defineCommand({
     meta: { name: 'my-cli' },
     args: { input: { type: 'positional' } },
     run: ({ args }) => console.log(args.input)
   });
   ```

2. `runMain(command)` - 运行主命令
   ```javascript
   import { runMain } from 'citty';
   runMain(command);
   ```

**在项目中的使用:**
- 在 `src/cli.ts` 中用于创建命令行界面
- 定义CLI命令的参数和执行逻辑

### consola

**主要API使用:**

1. `consola.info(message)` - 输出信息日志
   ```javascript
   import consola from 'consola';
   consola.info('Processing file...');
   ```

2. `consola.warn(message)` - 输出警告日志
   ```javascript
   consola.warn('Deprecated API used');
   ```

3. `consola.error(message)` - 输出错误日志
   ```javascript
   consola.error('Failed to process file');
   ```

4. `consola.success(message)` - 输出成功日志
   ```javascript
   consola.success('Build completed');
   ```

**在项目中的使用:**
- 在整个项目中用于输出日志信息
- 提供不同级别的日志输出（info, warn, error, success等）

### defu

**主要API使用:**

1. `defu(target, source)` - 深度合并对象
   ```javascript
   import { defu } from 'defu';
   const result = defu({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
   // 结果: { a: 1, b: { c: 2, d: 3 } }
   ```

2. `defu.arrayFn(target, source)` - 合并数组和函数
   ```javascript
   import { defu } from 'defu';
   const result = defu.arrayFn({ arr: [1] }, { arr: [2] });
   // 结果: { arr: [1, 2] }
   ```

**在项目中的使用:**
- 在 `src/build.ts` 中用于深度合并配置对象
- 合并默认配置和用户配置

### esbuild

**主要API使用:**

1. `transform(code, options)` - 转换代码
   ```javascript
   import { transform } from 'esbuild';
   const result = await transform('const foo = 1;', { loader: 'ts' });
   ```

2. `build(options)` - 打包项目
   ```javascript
   import { build } from 'esbuild';
   await build({ entryPoints: ['src/index.ts'], outfile: 'dist/out.js' });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/plugins/esbuild.ts` 中作为代码转换工具使用
- 提供快速的TypeScript/JavaScript代码转换

### hookable

**主要API使用:**

1. `createHooks()` - 创建钩子系统
   ```javascript
   import { createHooks } from 'hookable';
   const hooks = createHooks();
   ```

2. `hooks.hook(name, fn)` - 注册钩子
   ```javascript
   hooks.hook('build:before', () => console.log('Before build'));
   ```

3. `hooks.callHook(name, ...args)` - 调用钩子
   ```javascript
   await hooks.callHook('build:before', context);
   ```

**在项目中的使用:**
- 在 `src/build.ts` 中实现插件架构的事件系统
- 允许注册和调用钩子函数，提供插件扩展能力

### jiti

**主要API使用:**

1. `createJiti(rootDir, options)` - 创建JIT编译器实例
   ```javascript
   import { createJiti } from 'jiti';
   const jiti = createJiti(__dirname);
   ```

2. `jiti.import(id, options)` - 动态导入模块
   ```javascript
   const module = await jiti.import('./module.ts');
   ```

**在项目中的使用:**
- 在 `src/build.ts` 中用于即时编译和导入 TypeScript/JavaScript 文件
- 用于加载配置文件和源码

### magic-string

**主要API使用:**

1. `new MagicString(code)` - 创建MagicString实例
   ```javascript
   import MagicString from 'magic-string';
   const s = new MagicString('const foo = 1;');
   ```

2. `s.overwrite(start, end, content)` - 覆盖指定范围的内容
   ```javascript
   s.overwrite(6, 9, 'bar');
   ```

3. `s.generateMap()` - 生成源码映射
   ```javascript
   const map = s.generateMap({ hires: true });
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/plugins/cjs.ts` 中处理字符串修改
- 生成源码映射(source map)

### mkdist

**主要API使用:**

1. `mkdist(options)` - 构建源码
   ```javascript
   import { mkdist } from 'mkdist';
   const result = await mkdist({ rootDir: '.', srcDir: 'src', distDir: 'dist' });
   ```

**在项目中的使用:**
- 在 `src/builders/mkdist/index.ts` 中用于将源码转换为目标代码
- 处理非 JavaScript 文件的构建

### mlly

**主要API使用:**

1. `resolvePath(id, options)` - 解析模块路径
   ```javascript
   import { resolvePath } from 'mlly';
   const path = await resolvePath('lodash');
   ```

2. `resolveModuleExportNames(id, options)` - 解析模块导出名称
   ```javascript
   import { resolveModuleExportNames } from 'mlly';
   const exports = await resolveModuleExportNames('./module.js');
   ```

**在项目中的使用:**
- 在 `src/builders/rollup/stub.ts` 中处理ECMAScript模块
- 解析模块路径和导出信息

### pathe

**主要API使用:**

1. `resolve(...paths)` - 解析路径
   ```javascript
   import { resolve } from 'pathe';
   const fullPath = resolve('src', 'index.ts');
   ```

2. `dirname(path)` - 获取目录名
   ```javascript
   import { dirname } from 'pathe';
   const dir = dirname('/path/to/file.js');
   ```

3. `relative(from, to)` - 计算相对路径
   ```javascript
   import { relative } from 'pathe';
   const relPath = relative('/path/from', '/path/to/file.js');
   ```

**在项目中的使用:**
- 在整个项目中用于跨平台路径处理
- 提供统一的路径操作API

### pkg-types

**主要API使用:**

1. `readPackageJSON(path)` - 读取package.json
   ```javascript
   import { readPackageJSON } from 'pkg-types';
   const pkg = await readPackageJSON('./package.json');
   ```

**在项目中的使用:**
- 在 `src/auto.ts` 中处理包类型定义
- 提供 package.json 的类型信息

### untyped

**主要API使用:**

1. `resolveSchema(object, defaults)` - 解析模式
   ```javascript
   import { resolveSchema } from 'untyped';
   const schema = await resolveSchema(config, defaults);
   ```

2. `generateTypes(schema, options)` - 生成TypeScript类型
   ```javascript
   import { generateTypes } from 'untyped';
   const types = generateTypes(schema, { interfaceName: 'Config' });
   ```

**在项目中的使用:**
- 在 `src/builders/untyped/index.ts` 中从 JavaScript 对象生成 TypeScript 类型定义
- 处理配置对象的类型生成

## 开发工具

### vitest

**主要API使用:**

1. `describe(name, fn)` - 定义测试套件
   ```javascript
   import { describe, it, expect } from 'vitest';
   describe('math', () => {
     it('should add numbers', () => {
       expect(1 + 1).toBe(2);
     });
   });
   ```

2. `it(name, fn)` - 定义测试用例
   ```javascript
   it('should work', () => {
     // 测试逻辑
   });
   ```

**在项目中的使用:**
- 在 `test/` 目录中用于单元测试
- 提供测试运行环境

### eslint/prettier

**主要API使用:**

1. 通过配置文件使用，无直接编程API
2. 通过命令行使用：
   ```bash
   # ESLint代码检查
   eslint src/

   # Prettier代码格式化
   prettier --write src/
   ```

**在项目中的使用:**
- 在 `package.json` 的脚本中配置代码质量和格式检查
- 保证代码风格一致性
