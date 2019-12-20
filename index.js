const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const chalk = require("chalk");
const CFonts = require("cfonts");
const { exec } = require("shelljs");
const log = (txt, color = "lightblue") =>
  console.log(chalk.keyword(color)(txt));

const questions = require("./questions");
const { babelLoader } = require("./loaders");

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
  console.log(response);
  const { systemType, babelInclude, packageManager } = response;

  babelInclude && log("Installing babels...");
  exec(
    packageManager === 1
      ? "sh ./babelLoaders.sh"
      : "npm install -D babel-loader @babel/core @babel/preset-env webpack"
  );

  const wp = `const path = require('path');

    module.exports = {
        entry: {
            index: path.resolve(__dirname, 'index.js'),
            // Continue add your multiple entries if any...
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/')
        },
        module: {
            rules: [
                ${babelInclude && JSON.stringify(babelLoader)}
            ]
        }
    }
  `;

  let output;
  if (systemType === 0) {
    output = fs.writeFileSync(path.resolve(__dirname, "webpack.config.js"), wp);
    log("Succesfully generated your webpack.config.js");
  }
})();
