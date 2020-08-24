const babelLoader = require("./loaders/babelLoader");
const css_sassLoader = require("./loaders/css_sassLoader");
const file_urlLoader = require("./loaders/file_urlLoader");
const plugins = require("./plugins");

/**
 *
 * @param {boolean} babelInclude
 * @param {boolean} cssModules
 * @param {boolean} extractCSS
 * @param {boolean} sourcemaps
 *
 *
 * @return {string}
 *
 */

module.exports = (babelInclude, extractCSS, sourcemaps) => {
  return `const path = require("path");
  const env = process.env.NODE_ENV;
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const autoprefixer = require('autoprefixer');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  ${
    extractCSS
      ? 'const MiniCSSExtractPlugin = require("mini-css-extract-plugin");'
      : ""
    }

    module.exports = {
        mode: env === "dev" ? "development" : "production",
        entry: {
            index: path.resolve(__dirname, "src/index.js"),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: env === "dev" ? "assets/js/[name].js" : "assets/js/[name].[contentHash:8].js",
            chunkFilename: env === "dev" ? "assets/js/[name].js" : "assets/js/[name].[contentHash:8].js",
            path:path.resolve(__dirname, "./dist/")
        },
        module: {
            rules: [
                ${babelLoader(babelInclude)}${css_sassLoader(
      extractCSS
    )},${file_urlLoader}
            ]
        },
        plugins: ${plugins(extractCSS)},
        ${
    sourcemaps
      ? "devtool: env === 'dev' ? 'inline-cheap-source-map' : 'source-map'"
      : ""
    }
      };`;
};
