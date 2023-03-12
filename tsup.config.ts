import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/bin.ts', 'src/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'node',
  splitting: false,
  sourcemap: true,
  target: 'es2022'
});
