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
    const browserify = require('browserify');
    const babel = require('babelify');
    const browserSync = require('browser-sync').create();
    const hotReload = browserSync.reload;
    const colors = require('ansi-colors');
    const argv = require('minimist')(process.argv.slice(2));
    const isProduction = argv.production;
    const fs = require('fs');

    //Production
    const uglify = require('gulp-uglify');
    const pump = require('pump');
    

    //paths
    const pugPath = ['./src/pug/*.pug', './src/pug/**/*.pug'];
    const sassPath = ['./src/sass/*.s[a|c]ss', './src/sass/**/*.s[a|c]ss'];
    const jsPath = ['./src/js/*.js', './src/js/**/*.js'];
    const distPath = ['./dist/*.html', './dist/css/*.css', './dist/js/*.js']
    

    //Styles
    sass.compiler = require("node-sass");
    
    task("styles", () => {
      return src(sassPath[0])
        ${sourcemaps ? ".pipe(sourcemaps.init())" : ""}
        .pipe(sass({
          outputStyle: ${cssOutputStyle},// or you can add this line as an option "isProduction ? 'compressed' : 'expanded'"
        }).on("error", sass.logError))
        ${
          sourcemaps
            ? `.pipe(sourcemaps.write(${
                externalSourcemap ? `"./dist/maps"` : ""
              }))`
            : ""
        }
        .pipe(autoPrefixer())
        .pipe(dest("./dist/css"));
        isProduction && console.log(colors.blueBright('CSS Minified!'));
    });

    ${
      pugIncluded //Pug
        ? `task("pug", function() {
            src(pugPath[0])
              .pipe(pug())
              .pipe(dest("./dist/"));
          })`
        : ""
    }

    //JS bundle
    task("scripts", function() {
        browserify("./src/js/main.js")
            .transform(babel, {
                presets: ["es2015"]
            })
            .bundle()
            .pipe(fs.createWriteStream("./dist/js/main.js"))
    })
    
    //Minify JS
    task('minifyJS', function(cb) {
        setTimeout(function() {
            pump([
                    src('./dist/js/*.js'),
                    uglify(),
                    dest('./dist/js')
                ],
                cb
            );
            console.log(colors.yellow('JS Minified!'));
        }, 500)
    })
    
    //watch 
    task('watch', function() {
        watch(pugPath, ['pug', function() {
            console.log(colors.green('HTML Updated!'))
        }]);
        watch(sassPath, ['styles', function() {
            console.log(colors.blueBright('CSS Updated!'))
        }]);
        watch(jsPath, ['scripts', function() {
            console.log(colors.yellow('JS Updated!'))
        }]);
        watch(distPath, hotReload);
    })

    //Localhost 
    task('serve', function() {
        browserSync.init({
            server: {
                baseDir: "./dist"
            }
        })
    })
    
    //Fire!
    task('dist', ['pug', 'styles', 'scripts']); //dist
    task('dev', ['dist', 'watch', 'serve']); //Dev
    task('default', ['dist', isProduction ? 'minifyJS' : 'scripts']); //build
    `;
};
