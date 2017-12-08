const path = {
  src: 'src/',
  stylus: 'src/stylus/',
  js: 'src/js/',
  img: 'src/img/',
  build: 'build/'
};

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('json', () => {
  return gulp.src(path.src + '**/*.json')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulp.dest(path.build));
});

gulp.task('stylus', () => {
  return gulp.src(path.stylus + '**/*.styl')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(path.build + 'css'));
});

gulp.task('js', () => {
  return gulp.src(path.js + '**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build + 'js'));
});

gulp.task('imagemin', () => {
  return gulp.src(path.img + '**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.build + 'img'));
});

gulp.task('watch', () => {
  gulp.watch(path.json + '**/*.json', ['stylus']);
  gulp.watch(path.stylus + '**/*.styl', ['stylus']);
  gulp.watch(path.js + '**/*.js', ['js']);
});

gulp.task('default', ['watch', 'json', 'stylus', 'js']);
// imagemin task is manual
