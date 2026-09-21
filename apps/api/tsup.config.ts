import { defineConfig } from 'tsup';

// tsup bundles the API into dist/main.js for production.
// `noExternal` pulls the shared package's TypeScript source INTO the bundle,
// so we never have to build @skillswap/shared separately.
export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  platform: 'node',
  target: 'node20',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  noExternal: ['@skillswap/shared'],
});
