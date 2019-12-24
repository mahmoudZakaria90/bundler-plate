module.exports = (pugIncluded, cssOutputStyle) => {
  return `
    const gulp = require("gulp");
    const { dest, series, src, watch, parallel } = gulp;
    const sass = require("gulp-sass");
    const autoPrefixer = require("gulp-autoprefixer");
    ${pugIncluded ? 'const pug = require("gulp-pug");' : ""}
    const browserify = require('browserify');
    const babel = require('babelify');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const browserSync = require('browser-sync').create();
    const hotReload = browserSync.reload;

    //Production
    const uglify = require('gulp-uglify');
    

    //paths
    const pugPath = ['./src/pug/*.pug', './src/pug/**/*.pug'];
    const sassPath = ['./src/sass/*.s[a|c]ss', './src/sass/**/*.s[a|c]ss'];
    const jsPath = ['./src/js/*.js', './src/js/**/*.js'];

    //Styles
    sass.compiler = require("node-sass");
    
    const styles = cb => {
      return src(sassPath[0])
        .pipe(sass({
          outputStyle: "${cssOutputStyle}",
        }).on("error", sass.logError))
        .pipe(autoPrefixer())
        .pipe(dest("./dist/css"));
        cb()
    };

    ${
      pugIncluded
        ? `//Pug
           const pugIntoHTML = cb => {
            src(pugPath[0])
              .pipe(pug())
              .pipe(dest("./dist/"));
              cb()
          }`
        : ""
    }

    //JS bundle
    const scripts = cb => {
      return browserify("./src/js/main.js")
        .transform(babel, {
          presets: ["@babel/preset-env"]
          })
        .bundle()
        .pipe(source("main.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest("./dist"));
    }

    const reload = cb => {
      hotReload();
      cb();
    }
    
    
    //Watch 
    const gulpWatch = () => {
        watch(pugPath, series(pugIntoHTML, reload));
        watch(sassPath, series(styles, reload));
        watch(jsPath, series(scripts, reload));
    }

    //Localhost 
    const serve = () => {
        browserSync.init({
            server: {
                baseDir: "./dist"
            }
        })
    }

    const dist = series(pugIntoHTML, styles, scripts);
    const dev = series(dist, parallel(gulpWatch, serve));
    
    //Fire!
    
    //Singles
    exports.styles = styles;
    exports.pug = pug;
    exports.scripts = scripts;
    
    //Series
    exports.dev = dev;
    exports.default = dist;
    `;
};
