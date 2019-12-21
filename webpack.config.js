const path = require('path');
  undefined

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
                null,
                {test: /.s[a|c]ss$/, use [style-loader, 'css-loader', 'sass-loader']}
            ]
        },
        plugins: [
            undefined
        ]