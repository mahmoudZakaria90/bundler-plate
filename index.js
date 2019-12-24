#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { format } = require("prettier");

const CFonts = require("cfonts");
const { log, logSuccess, chalk } = require("./utils");
const questions = require("./questions");

//Intro
log("Hello and Welcome!");
log("Let's get started with");

CFonts.say("BundlerPlate.js", {
  font: "block",
  colors: ["blue", "cyan"],
  letterSpacing: 2
});

log("A boilerplate or basic config file based on webpack/gulp \n");
log(
  "Please answer the following questions to generate the best config file for you.\n"
);

//Inputs/Questions
(async () => {
  const response = await prompts(questions);

  const { toolType, packageManager } = response;

  if (!toolType || !packageManager) process.exit();

  console.log(
    chalk.cyan(
      "Based on your inputs:" +
        "\n" +
        "- System type: " +
        chalk.bold.bgMagenta.white(toolType) +
        "\n" +
        "- Package manager: " +
        chalk.bold.bgMagenta.white(packageManager)
    )
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
  logSuccess(`Succesfully generated your ${toolType} config file.`);
})();
