# unbuild Examples

This directory contains several examples demonstrating different ways to use unbuild for building JavaScript/TypeScript projects.

## Examples

1. [Zero Config](./1.zero-config/) - Demonstrates how unbuild can automatically infer build configuration from the `package.json` file without requiring a separate build configuration file.

2. [Mkdist](./2.mkdist/) - Shows how to use the mkdist builder for generating bundleless distributions with file-to-file transpilation, particularly useful for plugin systems.

3. [Untyped](./3.untyped/) - Illustrates how to use the untyped builder to generate TypeScript type definitions from runtime configurations.

## Overview

Each example is a self-contained project that demonstrates a specific feature or use case of unbuild:

- **Zero Config**: Perfect for simple projects that can rely on automatic configuration inference.
- **Mkdist**: Ideal for projects that need to process entire directories of files without bundling.
- **Untyped**: Useful for projects that need to generate type definitions from runtime configurations.

## Usage

To try any of the examples:

1. Navigate to the example directory:
   ```bash
   cd examples/[example-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

Each example includes a detailed README that explains its specific features and usage patterns.
