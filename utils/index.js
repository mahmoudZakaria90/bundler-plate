const chalk = require("chalk");

module.exports = {
  chalk,
  log(txt, color = "cyan") {
    console.log(chalk[color](txt));
  }
};
