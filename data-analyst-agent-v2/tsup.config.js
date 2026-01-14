const { copyFileSync, mkdirSync, readdirSync } = require('fs');
const { join } = require('path');

/** @type {import('tsup').Options} */
module.exports = {
  dts: true,
  minify: false,
  bundle: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  entry: ['src/index.ts'],
  format: ['cjs'],
  onSuccess: async () => {
    // Copy static data files to dist/data
    const srcDataDir = join(__dirname, 'src', 'data');
    const distDataDir = join(__dirname, 'dist', 'data');
    
    mkdirSync(distDataDir, { recursive: true });
    
    const files = readdirSync(srcDataDir);
    for (const file of files) {
      if (file.endsWith('.sql') || file.endsWith('.jsonl') || file.endsWith('.md') || file.endsWith('.db')) {
        copyFileSync(join(srcDataDir, file), join(distDataDir, file));
        console.log(`Copied: src/data/${file} -> dist/data/${file}`);
      }
    }
  },
};
