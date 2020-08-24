const { log, chalk } = require("./");

module.exports = response => {
  const {
    toolType,
    babelInclude,
    pugIncluded,
    sassSyntax,
    extractCSS,
    cssOutputStyle
  } = response;
  if (toolType === "webpack") {
    log(
      `- Using Babel: ${
      babelInclude
        ? chalk.bold.bgGreen.white(babelInclude)
        : chalk.bold.bgRed.white(babelInclude)
      }`
    );
    log(
      `- Using separate CSS file: ${
      extractCSS
        ? chalk.bold.bgGreen.white(extractCSS)
        : chalk.bold.bgRed.white(extractCSS)
      }`
    );
  } else {
    log(
      `- Using Sass syntax: ${chalk.bold.bgGreen.white(sassSyntax === 'dart-sass' ? ".sass" : ".scss")}`
    );
    log(
      `- Using Pug: ${
      pugIncluded
        ? chalk.bold.bgGreen.white(pugIncluded)
        : chalk.bold.bgRed.white(pugIncluded)
      }`
    );
    log(`- CSS output style: ${chalk.bold.bgBlue.white(cssOutputStyle)}`);
  }
};
