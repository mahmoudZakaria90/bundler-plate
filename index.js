#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { format } = require("prettier");

const { say } = require("cfonts");
const { log, chalk } = require("./utils");
const loggingChosenOptions = require("./utils/loggingChosenOptions");
const questions = require("./questions");

//Intro
log("Hello and Welcome!");
log("Let's get started with...");

say("BundlerPlate.js", {
  font: "block",
  colors: ["blue", "cyan"],
  letterSpacing: 2
});

log("Generate a boilerplate webpack/gulp config file. \n");
log(
  "Please provide the following inputs to get you started.\n"
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
