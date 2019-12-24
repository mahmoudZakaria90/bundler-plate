module.exports = (babelLoader, cssModules, extractCSS) => {
  return `const path = require("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
  ${
    extractCSS
      ? 'const miniCSSExtractPlugin = require("mini-css-extract-plugin");'
      : ""
  }

    const env = process.env.NODE_ENV;

    module.exports = {
        entry: {
            index: path.resolve(__dirname, "index.js"),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: env === "dev" ? "assets/js/[name].js" : "assets/js/[name].[contentHash:8].js",
            chunkFilename: env === "dev" ? "assets/js/[name].js" : "assets/js/[name].[contentHash:8].js",
            path:
              env === "dev"
                ? path.resolve(__dirname, "./dev")
                : path.resolve(__dirname, "./dist/")
        },
        module: {
            rules: [
                ${babelLoader ? `${babelLoader},` : ""} 
                {test: /\\.s[a|c]ss$/, use: [${
                  extractCSS ? "miniCSSExtractPlugin.loader" : `"style-loader"`
                }, 
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
                }, "sass-loader"]},
                {
                  test: /\\.(woff(2)?|ttf|eot|svg)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
                  loader: "file-loader",
                  options: {
                    name: env === "dev" ? "[name].[ext]" : "[name].[contentHash:8].[ext]",
                    outputPath: "assets/fonts/"
                  }
                },
                {
                  test: /\\.(png|jpe?g|gif)$/,
                  use : {
                      loader: 'url-loader',
                      options : { limit: 8192, outputPath: "assets/images/" },
                  },
              },
            ]
        },
        plugins: [
            ${
              extractCSS
                ? `new miniCSSExtractPlugin({
                  filename: env === "dev" ? "[name].css" : "[name].[contentHash:8].css", 
                  chunkFilename: env === "dev" ? "[name].css" : "[name].[contentHash:8].css", 
                }),`
                : ""
            } 
             new htmlWebpackPlugin()
          ],
          devServer: {
            contentBase: "./dist",
            port: 8000,
            compress: true
          },
          mode: env === "dev" ? "development" : "production",
      };`;
};
