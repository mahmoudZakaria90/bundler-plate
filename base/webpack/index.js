module.exports = (babelLoader, extractCSS) => {
  return `const path = require('path');
  ${extractCSS &&
    "const miniCSSExtractPlugin = require('mini-css-extract-plugin');"}

    module.exports = {
        entry: {
            index: path.resolve(__dirname, 'index.js'),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/')
        },
        
        modules: {
            rules: [
                ${babelLoader},
                {test: /\.s[a|c]ss$/, use [${
                  extractCSS
                    ? "miniCSSExtractPlugin.loader".replace('"', "")
                    : "style-loader"
                }, 'css-loader', 'sass-loader']}
            ]
        },
        plugins: [
            ${extractCSS &&
              'new miniCSSExtractPlugin({filename: "[name].css"})'}
        ]`;
};
