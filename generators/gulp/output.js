const { log } = require("../../utils");
const { exec } = require("shelljs");
const gulpBase = require("../../base/gulp");

/**
 *
 * @param {boolean} pugIncluded
 * @param {string} cssOutputStyle
 * @param {boolean} sourcemaps
 * @param {string} packageManager
 *
 *
 * @return {string}
 *
 */

module.exports = ({
  pugIncluded,
  cssOutputStyle,
  sourcemaps,
  packageManager
}) => {
  const path = __dirname + "/../../shell";

  // Installing packages
  log("Installing packages and configs...", "yellow");
  exec(
    `sh ${path}/gulp/${packageManager}/gulp.sh ${pugIncluded &&
      `;sh ${path}/gulp/${packageManager}/gulp-pug.sh`}${sourcemaps &&
      `;sh ${path}/gulp/${packageManager}/gulp-sourcemaps.sh`}`
  );
  log("Successfully installed packages.", "green");

  return gulpBase(pugIncluded, cssOutputStyle, sourcemaps);
};
