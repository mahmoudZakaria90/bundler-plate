const { log, logSuccess } = require("../../utils");
const { exec } = require("shelljs");

const gulpBase = require("../../base/gulp");

module.exports = ({
  pugIncluded,
  cssOutputStyle,
  packageManager,
  sourcemaps
}) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages...", "yellow");
  exec(
    `sh ${path}/gulp/${packageManager}/gulp.sh ${pugIncluded &&
      `;sh ${path}/gulp/${packageManager}/gulp-pug.sh`}${sourcemaps &&
      `;sh ${path}/gulp/${packageManager}/gulp-sourcemaps.sh`}`
  );
  logSuccess("Successfully installed packages.");

  return gulpBase(pugIncluded, cssOutputStyle, sourcemaps);
};
