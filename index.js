const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const chalk = require("chalk");
const CFonts = require("cfonts");
const env = process.env.ENV;
const log = console.log;

const questions = require("./questions");

//Intro
log(chalk.keyword("lightblue")("Hello and Welcome!"));
log(chalk.keyword("lightblue")("Let's get started with"));

CFonts.say("BundlerPlate.js", {
  font: "block",
  colors: ["blue", "cyan"],

  letterSpacing: 2
});

log(
  chalk.keyword("lightblue")(
    "Please answer the following questions to generate the best config file for you."
  )
);

//Inputs/Questions
(async () => {
  const response = await prompts(questions);
  const { systemType } = response;

  const wp = `const path = require('path');

    module.exports = {
        entry: {
            index: path.resolve(__dirname, 'index.js'),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/')
        }
    }
  `;

  let output;
  if (systemType === 0) {
    output = fs.writeFileSync(path.resolve(__dirname, "webpack.config.js"), wp);
  }
})();
