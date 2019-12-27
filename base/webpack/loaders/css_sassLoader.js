module.exports = (extractCSS, cssModules) => {
  return `
    {
     test: /\\.s[a|c]ss$/, 
     use: [${extractCSS ? "miniCSSExtractPlugin.loader" : `"style-loader"`}, 
      ${
        !cssModules
          ? `"css-loader"`
          : `{
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: env === "dev" ? "[name]__[local]" :"[name]__[local]__[contentHash:8]"
          }
        }
      }`
      }, "sass-loader"]}`;
};
