# Unbuild Untyped Example

This example demonstrates how to use the untyped builder to generate type declarations from runtime configurations.

## Overview

The untyped builder is used for generating TypeScript type definitions from runtime JavaScript objects. This example shows how to configure unbuild to use the untyped builder for creating schema-based type definitions.

## Key Features

1. **Untyped Builder**: Uses the untyped builder to generate TypeScript type definitions from runtime configurations.
2. **Schema Generation**: Automatically generates schema files from the source code.
3. **Runtime Configuration**: Demonstrates how to handle runtime configurations with type safety.

## File Structure

```
src/
└── index.ts      # Main entry point with configuration object
```

## Build Configuration

The `build.config.ts` defines the following entries:

1. `src/index.ts`: Main entry point built with default settings
2. `{ builder: "untyped", input: "src/index.ts", outDir: "schema", name: "schema" }`:
   Uses the untyped builder to generate schema from the source file

## Exports Configuration

The `package.json` defines the following exports:

- `.` (main entry):
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

## Output

After building, the `dist` directory will contain:

- `index.mjs` and `index.d.mts` (ESM format)
- `index.cjs` and `index.d.cts` (CJS format)

Additionally, a `schema` directory will be generated with:

- `schema.d.ts`: TypeScript definitions generated from the runtime configuration
- `schema.mjs`: ESM module with the resolved configuration
- `schema.cjs`: CJS module with the resolved configuration

This demonstrates how the untyped builder can be used to generate type-safe configurations from runtime objects, making it easier to maintain type safety in configuration-heavy applications.
