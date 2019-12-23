const { log } = require("../../utils");
const { exec } = require("shelljs");

const gulpBase = require("../../base/gulp");

module.exports = ({
  pugIncluded,
  cssOutputStyle,
  sourcemaps,
  externalSourcemap,
  packageManager
}) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages...");
  exec(
    `sh ${path}/gulp/${packageManager}/gulp.sh ${pugIncluded &&
      `;sh ${path}/gulp/${packageManager}/gulp-pug.sh`}${sourcemaps &&
      `;sh ${path}/gulp/${packageManager}/gulp-sourcemaps.sh`}`
  );
  log("Successfully installed packages", "green");

  return gulpBase(pugIncluded, cssOutputStyle, sourcemaps, externalSourcemap);
};