module.exports = (pugIncluded, cssOutputStyle, sourcemaps) => {
  return `
    const gulp = require("gulp");
    const { dest, series, src, watch: gulpWatch, parallel } = gulp;
    const sass = require("gulp-sass");
    const autoPrefixer = require("gulp-autoprefixer");
    const browserify = require('browserify');
    const babel = require('babelify');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const browserSync = require('browser-sync').create();
    const hotReload = browserSync.reload;

    ${pugIncluded ? 'const pug = require("gulp-pug");' : ""}
    ${sourcemaps ? 'const sourcemaps = require("gulp-sourcemaps");' : ""}
    
    //Production
    const uglify = require('gulp-uglify');
    

    //paths
    const pugPath =  './src/pug/**/*.pug';
    const sassPath = './src/sass/**/*.s[a|c]ss';
    const jsPath = './src/js/**/*.js';

    //Styles
    sass.compiler = require("node-sass");
    
    const styles = () => {
      return src(sassPath)
        ${sourcemaps ? ".pipe(sourcemaps.init())" : ""}
        .pipe(sass({
          outputStyle: "${cssOutputStyle}",
        })
        .on("error", sass.logError))
        .pipe(autoPrefixer())
        ${sourcemaps ? ".pipe(sourcemaps.write())" : ""}
        .pipe(dest("./dist/css"));
        
    };

    ${
    pugIncluded
      ? `//Pug
           const pugIntoHTML = () => {
            return src(pugPath)
              .pipe(pug())
              .pipe(dest("./dist/"));
          }`
      : ""
    }

    //JS bundle
    const scripts = () => {
      return browserify("./src/js/main.js")
        .transform(babel, {
          presets: ["@babel/preset-env"]
          })
        .bundle()
        .pipe(source("main.min.js"))
        .pipe(buffer())
        ${sourcemaps ? ".pipe(sourcemaps.init())" : ""}
        .pipe(uglify())
        ${sourcemaps ? ".pipe(sourcemaps.write())" : ""}
        .pipe(dest("./dist/js"));
    }

    const reload = cb => {
      hotReload();
      cb();
    }
    
    
    //Watch 
    const gulpWatchGroup = () => {
        gulpWatch(pugPath, series(pugIntoHTML, reload));
        gulpWatch(sassPath, series(styles, reload));
        gulpWatch(jsPath, series(scripts, reload));
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
    const dev = series(dist, parallel(gulpWatchGroup, serve));
    
    //Fire!
    
    //Singles
    exports.styles = styles;
    exports.scripts = scripts;
    ${pugIncluded ? "exports.pug = pugIntoHTML" : ""};
    
    //Series
    exports.dev = dev;
    exports.watch = gulpWatchGroup;
    exports.default = dist;
    `;
};
