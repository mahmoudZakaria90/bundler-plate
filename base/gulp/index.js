module.exports = (
  pugIncluded,
  cssOutputStyle,
  sourcemaps,
  externalSourcemap
) => {
  return `
    const gulp = require("gulp");
    const { task, watch, dest, src } = gulp;
    const sass = require("gulp-sass");
    const autoPrefixer = require("gulp-autoprefixer");
    ${pugIncluded ? 'const pug = require("gulp-pug");' : ""}
    ${sourcemaps ? 'const sourcemaps = require("gulp-sourcemaps");' : ""}
    
    sass.compiler = require("node-sass");
    
    task("styles", () => {
      return gulp
        .src("./src/sass/**/*.s[a|c]ss")
        ${sourcemaps ? ".pipe(sourcemaps.init())" : ""}
        .pipe(sass({
          outputStyle: ${cssOutputStyle},
        }).on("error", sass.logError))
        ${
          sourcemaps
            ? `.pipe(sourcemaps.write(${externalSourcemap ? "./maps" : ""}))`
            : ""
        }
        .pipe(autoPrefixer())
        .pipe(gulp.dest("./dist/css"));
    });
    
    `;
};
