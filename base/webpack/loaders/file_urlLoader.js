module.exports = `
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
        options : { limit: 8192, outputPath: "assets/images/" }
    }
 }
`;
