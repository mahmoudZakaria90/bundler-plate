module.exports = `
{
    test: /\\.(woff(2)?|ttf|eot|svg)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath: "assets/fonts/"
    }
  },
  {
    test: /\\.(png|jpe?g|gif)$/,
    use : {
        loader: "file-loader",
        options : { name: "[name].[ext]", outputPath: "assets/images/" }
    }
 }
`;
