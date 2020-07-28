const { log, chalk } = require("./");

module.exports = response => {
  const {
    toolType,
    babelInclude,
    pugIncluded,
    cssModules,
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
      `- Using CSS modules: ${
        cssModules
          ? chalk.bold.bgGreen.white(cssModules)
          : chalk.bold.bgRed.white(cssModules)
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
      `- Using Pug: ${
        pugIncluded
          ? chalk.bold.bgGreen.white(pugIncluded)
          : chalk.bold.bgRed.white(pugIncluded)
      }`
    );
    log(`- CSS output style: ${chalk.bold.bgBlue.white(cssOutputStyle)}`);
  }
};