const { log, logSuccess } = require("../../utils");
const { exec } = require("shelljs");

const gulpBase = require("../../base/gulp");

module.exports = ({ pugIncluded, cssOutputStyle, packageManager }) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages...", "yellow");
  exec(
    `sh ${path}/gulp/${packageManager}/gulp.sh ${pugIncluded &&
      `;sh ${path}/gulp/${packageManager}/gulp-pug.sh`}`
  );
  logSuccess("Successfully installed packages.");

  return gulpBase(pugIncluded, cssOutputStyle);
};
