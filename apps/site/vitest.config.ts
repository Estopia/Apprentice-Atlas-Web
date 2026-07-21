import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'json-summary'],
      thresholds: { statements: 75, branches: 70, functions: 75, lines: 75 },
    },
  },
  resolve: { alias: { '@': path.resolve(dirname, 'src') } },
});
