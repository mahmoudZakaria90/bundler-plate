#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const format = require("js-beautify");

const CFonts = require("cfonts");
const { log } = require("./utils");
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

  log(`Based on your inputs you chose:
   - System: ${toolType}
   - Package manager: ${packageManager}
  `);

  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      `${toolType}${toolType === "webpack" ? ".config." : "file."}js`
    ),
    format(require(`./generators/${toolType}/output`)(response))
  );
  log("Succesfully generated your webpack.config.js", "green");
})();
