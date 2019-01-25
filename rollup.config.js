import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from 'rollup-plugin-commonjs';
import cssnano from 'cssnano';
import postcssNormalize from 'postcss-normalize';
import filesize from 'rollup-plugin-filesize';
import injectEnv from 'rollup-plugin-inject-env';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = isProduction === false;

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'public/giphy.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    injectEnv(),
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: true,
      sourceMap: isDevelopment,
      plugins: [
        autoprefixer(),
        postcssNormalize(),
        cssnano()
      ]
    }),
    (isDevelopment && browsersync({ server: 'public' })),
    (isProduction && terser()),
    (isProduction && filesize())
  ]
};
