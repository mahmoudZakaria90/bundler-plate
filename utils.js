const chalk = require("chalk");

module.exports = {
  log(txt, color = "lightblue") {
    console.log(chalk.keyword(color)(txt));
  }
};
