const browsersync = require("rollup-plugin-browsersync");
const postcss = require("rollup-plugin-postcss");
const normalize = require("postcss-normalize");
const autoprefixer = require("autoprefixer");
const babel = require ('rollup-plugin-babel');
const resolve = require ('rollup-plugin-node-resolve');
const commonjs = require ('rollup-plugin-commonjs');
const { terser } = require ("rollup-plugin-terser");
const filesize = require('rollup-plugin-filesize');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = isProduction === false;

module.exports = {
  input: "src/scripts/index.js",
  output: {
    file: "public/giphy.js",
    format: "iife"
  },
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
     postcss({
       extract: true,
       sourceMap: true,
       plugins: [normalize(), autoprefixer()]
     }),
     babel({
     exclude: 'node_modules/**'
   }),
    resolve(),
    commonjs(),
    terser(),
    filesize(),
    isDevelopment && terser(),
    isDevelopment && browsersync({ server: "public" })
   ]
};
