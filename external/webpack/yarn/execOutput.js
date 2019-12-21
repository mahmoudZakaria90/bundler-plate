const { log } = require("../../../utils");
const { exec } = require("shelljs");

module.exports = ({ babelInclude, extractCSS }) => {
  // Installing packages
  if (babelInclude) {
    log("Installing babels...");
    exec("sh ./shell/webpack/babelLoaders.sh");
    log("Successfully installed babel packages", "green");
  } else if (extractCSS) {
    log("Installing sass/css packages...");
    exec(
      `sh ./shell/webpack/sass-cssLoaders.sh;${
        extractCSS
          ? "yarn add -D mini-css-extract-plugin"
          : "yarn add -D style-loader"
      }`
    );
  }

  //writing webpack
  const wpBase = require("../../../base/webpack");
  const babelLoader = babelInclude
    ? JSON.stringify(require("../../../tasks/webpack/babelLoader"))
    : null;
  return wpBase(babelLoader, extractCSS);
};
