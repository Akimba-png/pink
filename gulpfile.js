const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");


const styles = () => {
  return gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(rename("style.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("source/css"))
  .pipe(browserSync.stream());
};
exports.styles = styles;

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './source',
    },
  });
  done();
};

const watcher = () => {
  gulp.watch('./source/less/**/*.less', styles);
  gulp.watch('./source/*.html').on('change', browserSync.reload);
};

exports.default = gulp.series(styles, server, watcher);
