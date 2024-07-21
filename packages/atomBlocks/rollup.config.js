const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve')
const extensions = ['.js', '.jsx', 'ts', '.tsx'];
const isDev = process.env.mode !== 'production';

module.exports = {
  external: ['vue'],
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: isDev,
  },
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
  ],
}
