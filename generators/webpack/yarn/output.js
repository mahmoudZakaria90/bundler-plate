const { log } = require("../../../utils");
const { exec } = require("shelljs");

const wpBase = require("../../../base/webpack");
const babelLoader = require("../../../tasks/webpack/babelLoader");

module.exports = ({ babelInclude, extractCSS, templateEngine }) => {
  // Installing packages
  if (babelInclude) {
    log("Installing packages...");
    exec(
      `sh ./shell/webpack/babelLoaders.sh; sh ./shell/webpack/sass-cssLoaders.sh;${
        extractCSS
          ? "yarn add -D mini-css-extract-plugin"
          : "yarn add -D style-loader"
      };${templateEngine && `yarn add -D ${templateEngine}`}`
    );
    log("Successfully installed packages", "green");
  }
  //writing webpack
  const babelLoaderArg = babelInclude ? babelLoader : null;
  return wpBase(babelLoaderArg, extractCSS, templateEngine);
};
