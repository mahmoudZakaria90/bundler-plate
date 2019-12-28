const chalk = require("chalk");

module.exports = {
  log(txt, color = "cyan") {
    console.log(chalk[color](txt));
  },
  chalk
};
