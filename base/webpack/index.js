module.exports = (babelLoader, extractCSS, templateGenerate) => {
  return `const path = require("path");
  ${
    extractCSS
      ? 'const miniCSSExtractPlugin = require("mini-css-extract-plugin");'
      : ""
  }
  ${
    templateGenerate
      ? 'const htmlWebpackPlugin = require("html-webpack-plugin");'
      : ""
  }

    module.exports = {
        entry: {
            index: path.resolve(__dirname, "index.js"),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'dist/')
        },
        
        module: {
            rules: [
                ${babelLoader ? `${babelLoader},` : ""} 
                {test: /\.s[a|c]ss$/, use: [${
                  extractCSS ? "miniCSSExtractPlugin.loader" : `"style-loader"`
                }, "css-loader", "sass-loader"]}
            ]
        },
        plugins: [
            ${
              extractCSS
                ? 'new miniCSSExtractPlugin({filename: "[name].css"}),'
                : ""
            } 
            ${templateGenerate ? "new htmlWebpackPlugin()" : ""}
          ]
      };`;
};
