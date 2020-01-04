/**
 *
 * @param {boolean} babelInclude
 *
 * @return {string}
 *
 */

module.exports = babelInclude => {
  return babelInclude
    ? `{
    test: /\\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  },`
    : "";
};
