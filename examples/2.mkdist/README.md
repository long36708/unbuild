# Unbuild Mkdist Example

This example demonstrates how to use the mkdist builder to generate ESM, CJS, and DTS files from TypeScript using a folder as the entry point.

## Overview

The mkdist builder is used for generating bundleless distributions with file-to-file transpilation. This example shows how to configure unbuild to use the mkdist builder for building plugins with different output formats.

## Key Features

1. **Mkdist Builder**: Uses the mkdist builder for file-to-file transpilation.
2. **Multiple Output Formats**: Generates both ESM and CJS formats for the plugins.
3. **Wildcard Exports**: Demonstrates how to use wildcard exports in package.json for plugin directories.
4. **Selective Declaration Generation**: Shows how to generate declarations for ESM but not for CJS.

## File Structure

```
src/
├── index.ts           # Main entry point
└── plugins/
    ├── vite.ts        # Vite plugin
    └── webpack.ts     # Webpack plugin
```

## Build Configuration

The `build.config.ts` defines the following entries:

1. `src/index.ts`: Main entry point built with default settings
2. `src/plugins/`: Plugin directory built as ESM format with declarations
3. `src/plugins/`: Plugin directory built as CJS format without declarations

## Exports Configuration

The `package.json` defines the following exports:

- `.` (main entry):
  - `import`: ESM format with type definitions
  - `require`: CJS format with type definitions
- `./plugins/*` (plugin wildcard):
  - `import`: ESM format with type definitions
  - `require`: CJS format with type definitions

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. For development, you can use stub mode:
   ```bash
   npm run build:stub
   ```

## Output

After building, the `dist` directory will contain:

- `index.mjs` and `index.d.mts` (ESM format)
- `index.cjs` and `index.d.cts` (CJS format)
- `plugins/` directory with:
  - `vite.mjs` and `vite.d.mts` (ESM format)
  - `webpack.mjs` and `webpack.d.mts` (ESM format)
  - `vite.cjs` (CJS format, no declarations)
  - `webpack.cjs` (CJS format, no declarations)

This demonstrates how the mkdist builder can be used to process entire directories and generate different output formats for different use cases.
