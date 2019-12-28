#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { format } = require("prettier");

const { say } = require("cfonts");
const { log, chalk } = require("./utils");
const questions = require("./questions");

const loggingChosenOptions = response => {
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

//Intro
log("Hello and Welcome!");
log("Let's get started with...");

say("BundlerPlate.js", {
  font: "block",
  colors: ["blue", "cyan"],
  letterSpacing: 2
});

log("A boilerplate or basic config file for webpack/gulp. \n");
log(
  "Please answer the following questions to generate the best config file for you.\n"
);

//Inputs/Questions
(async () => {
  const response = await prompts(questions);

  const { toolType, packageManager, sourcemaps } = response;

  if (!toolType || !packageManager) process.exit();

  log("Based on your inputs:");
  log(`- System type: ${chalk.bold.bgMagenta.white(toolType)}`);
  log(`- Package manager: ${chalk.bold.bgMagenta.white(packageManager)}`);
  loggingChosenOptions(response);
  log(
    `- Using sourcemaps: ${
      sourcemaps
        ? chalk.bold.bgGreen.white(sourcemaps)
        : chalk.bold.bgRed.white(sourcemaps)
    }`
  );

  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      `${toolType}${toolType === "webpack" ? ".config." : "file."}js`
    ),
    format(require(`./generators/${toolType}/output`)(response), {
      parser: "babel"
    })
  );
  log(`Succesfully generated your ${toolType} config file.`, "green");
})();
