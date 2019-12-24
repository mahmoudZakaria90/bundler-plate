const { log, logSuccess } = require("../../utils");
const { exec } = require("shelljs");

const wpBase = require("../../base/webpack");
const babelLoader = require("../../tasks/webpack/babelLoader");

module.exports = ({ babelInclude, cssModules, extractCSS, packageManager }) => {
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

  logSuccess("Successfully installed packages");

  const babelLoaderArg = babelInclude ? babelLoader : null;
  return wpBase(babelLoaderArg, cssModules, extractCSS);
};
