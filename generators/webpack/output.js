const { log } = require("../../utils");
const { exec } = require("shelljs");

const wpBase = require("../../base/webpack");
const babelLoader = require("../../tasks/webpack/babelLoader");

module.exports = ({
  babelInclude,
  extractCSS,
  templateGenerate,
  packageManager
}) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  if (babelInclude) {
    log("Installing packages...");
    exec(
      `sh ${path}/webpack/${packageManager}/babel-loaders.sh; sh ${path}/webpack/${packageManager}/sass-cssLoaders.sh;${
        extractCSS
          ? `sh ${path}/webpack/${packageManager}/miniCSSExtractPlugin.sh`
          : `sh ${path}/webpack/${packageManager}/style-loader.sh`
      };${templateGenerate && "yarn add -D html-webpack-plugin"}`
    );
    log("Successfully installed packages", "green");
  }

  const babelLoaderArg = babelInclude ? babelLoader : null;
  return wpBase(babelLoaderArg, extractCSS, templateGenerate);
};
