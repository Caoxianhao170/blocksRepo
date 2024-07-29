import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const extensions = ['.js', '.jsx', 'ts', '.tsx'];
const isDev = process.env.mode !== 'production';

export default {
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
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
  ],
}
