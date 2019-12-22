const { log } = require("../utils");
const { exec } = require("shelljs");

const wpBase = require("../base/webpack");
const babelLoader = require("../tasks/webpack/babelLoader");

module.exports = ({
  toolType,
  babelInclude,
  extractCSS,
  templateGenerate,
  packageManager
}) => {
  // Installing packages
  if (babelInclude) {
    log("Installing packages...");
    exec(
      `sh ./shell/${toolType}/${packageManager}/babel-loaders.sh; sh ./shell/${toolType}/${packageManager}/sass-cssLoaders.sh;${
        extractCSS
          ? `sh ./shell/${toolType}/${packageManager}/miniCSSExtractPlugin.sh`
          : `sh ./shell/${toolType}/${packageManager}/style-loader.sh`
      };${templateGenerate && "yarn add -D html-webpack-plugin"}`
    );
    log("Successfully installed packages", "green");
  }

  const babelLoaderArg = babelInclude ? babelLoader : null;
  return wpBase(babelLoaderArg, extractCSS, templateGenerate);
};
