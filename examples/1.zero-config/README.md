# Unbuild Zero Config Example

This example demonstrates how unbuild can automatically infer the build configuration from the `exports` field in [`package.json`](./package.json).

## Overview

Unbuild automatically infers the build configuration from `exports` field in [`package.json`](./package.json).

Since 3 `types`, `import` and `require` fields are set, build automatically includes them.

Unbuild also supports building multiple entries.

## Key Features

1. **Zero Configuration**: No need to create a `build.config.ts` file. Unbuild automatically infers the configuration from the `package.json` file.
2. **Multiple Entries**: This example shows how to build multiple entries (`index.ts` and `utils.ts`) with different export formats.
3. **Dual Package**: The package supports both ESM and CJS formats with corresponding type definitions.

## File Structure

```
src/
├── index.ts      # Main entry point
└── utils.ts      # Utility functions
```

## Exports Configuration

The `package.json` defines the following exports:

- `.` (main entry):
  - `import`: ESM format with type definitions
  - `require`: CJS format with type definitions
- `./utils` (secondary entry):
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
- `utils.mjs` and `utils.d.mts` (ESM format)
- `utils.cjs` and `utils.d.cts` (CJS format)

This demonstrates how unbuild can automatically generate both ESM and CJS builds with corresponding TypeScript declarations based solely on the `package.json` configuration.
