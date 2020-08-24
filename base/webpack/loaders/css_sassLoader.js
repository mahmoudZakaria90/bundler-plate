/**
 *
 * @param {boolean} extractCSS
 *
 * @return {string}
 *
 */

module.exports = (extractCSS) => {
  return `
    {
     test: /\\.s[a|c]ss$/, 
     use: [${extractCSS ? "MiniCSSExtractPlugin.loader" : `"style-loader"`},
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [autoprefixer()]
      }
    }, "sass-loader"]}`;
};
