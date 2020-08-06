/**
 *
 * @param {boolean} cssModules
 * @param {boolean} extractCSS
 *
 * @return {string}
 *
 */

module.exports = (extractCSS, cssModules) => {
  return `
    {
     test: /\\.s[a|c]ss$/, 
     use: [${extractCSS ? "miniCSSExtractPlugin.loader" : `"style-loader"`}, 
      ${!cssModules
      ? `"css-loader?url=false"`
      : `{
        loader: "css-loader?url=false",
        options: {
          importLoaders: 2,
          modules: {
            localIdentName:"[name]__[local]__[contentHash:8]"
          }
        }
      }`
    },{
      loader: "postcss-loader",
      options: {
        plugins: () => [autoprefixer()]
      }
    }, "sass-loader"]}`;
};
