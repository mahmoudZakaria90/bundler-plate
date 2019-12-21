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
  const { toolType, packageManager, babelInclude, extractCSS } = response;
  console.log(packageManager);

  fs.writeFileSync(
    path.resolve(
      __dirname,
      `${toolType}.${toolType === "webpack" && "config."}js`
    ),
    require(`./external/${toolType}/${packageManager}/execOutput`)(
      babelInclude,
      extractCSS
    )
  );
  log("Succesfully generated your webpack.config.js", "green");
})();
