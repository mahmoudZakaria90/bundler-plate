/**
 *
 * @param {boolean} extractCSS
 *
 * @return {string}
 *
 */

module.exports = extractCSS => {
  return `[
         new HtmlWebpackPlugin(),
         new CleanWebpackPlugin(),
         ${extractCSS ? `new MiniCSSExtractPlugin({
              filename: env ==="dev" ? "assets/css/[name].css" : "assets/css/[name].[contentHash:8].css", 
              chunkFilename: env ==="dev" ? "assets/css/[name].css" : "assets/css/[name].[contentHash:8].css", 
            })`
      : ""
    } 
      ]`;
};
