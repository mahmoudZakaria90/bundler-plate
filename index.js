#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

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

log(
  "Please answer the following questions to generate the best config file for you."
);

//Inputs/Questions
(async () => {
  const response = await prompts(questions);
  if (
    Object.keys(response).length !== questions.length &&
    response.constructor === Object
  )
    process.exit();
  const { toolType } = response;

  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      `${toolType}.${toolType === "webpack" && "config."}js`
    ),
    require(`./generators/output`)(response)
  );
  log("Succesfully generated your webpack.config.js", "green");
})();
