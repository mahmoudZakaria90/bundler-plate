module.exports = markup => {
  return `
    const gulp = require("gulp");
    const { task, watch, dest, src } = gulp;
    const sass = require("gulp-sass");
    const autoPrefixer = require("gulp-autoprefixer");
    ${markup === "gulp-pug" ? `const pug = require(${markup});` : ""}
    
    sass.compiler = require("node-sass");
    
    task("styles", () => {
      return gulp
        .src("./src/sass/**/*.s[a|c]ss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulp.dest("./dist/css"));
    });
    
    `;
};
