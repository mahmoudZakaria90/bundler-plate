const { log } = require("../../utils");
const { exec } = require("shelljs");

const wpBase = require("../../base/webpack");

module.exports = ({
  babelInclude,
  cssModules,
  extractCSS,
  packageManager,
  sourcemaps
}) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages...", "yellow");
  exec(
    `sh ${path}/webpack/${packageManager}/webpack.sh${babelInclude &&
      `;sh ${path}/webpack/${packageManager}/babel-loaders.sh`}${
      extractCSS
        ? `;sh ${path}/webpack/${packageManager}/miniCSSExtractPlugin.sh`
        : `;sh ${path}/webpack/${packageManager}/style-loader.sh`
    }`
  );

  log("Successfully installed packages", "green");

  return wpBase(babelInclude, cssModules, extractCSS, sourcemaps);
};
