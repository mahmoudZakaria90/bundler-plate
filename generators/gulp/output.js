const { log } = require("../../utils");
const { exec } = require("shelljs");

const gulpBase = require("../../base/gulp");

module.exports = ({ markup }) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages...");
  exec(
    `sh ${path}/gulp/${packageManager}/gulp.sh ${markup === "gulp-pug" &&
      `;sh ${path}/gulp/${packageManager}/gulp-pug.sh`} `
  );
  log("Successfully installed packages", "green");

  return gulpBase(markup);
};
