module.exports = extractCSS => {
  return `[
         new htmlWebpackPlugin(),
         new CleanWebpackPlugin(),
         ${
           extractCSS
             ? `new miniCSSExtractPlugin({
                filename: env === "dev" ? "[name].css" : "[name].[contentHash:8].css", 
                chunkFilename: env === "dev" ? "[name].css" : "[name].[contentHash:8].css", 
              })`
             : ""
         } 
      ]`;
};
