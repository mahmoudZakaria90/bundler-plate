const chalk = require("chalk");

module.exports = {
  log(txt, color = "cyan") {
    console.log(chalk[color](txt));
  },
  logSuccess(txt) {
    console.log(chalk.green(txt));
  },
  chalk
};
