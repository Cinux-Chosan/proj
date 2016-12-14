const gulp = require('gulp'),
  less = require('gulp-less'),
  connect = require('gulp-connect'),
  nodemon = require('gulp-nodemon'),
  LessAutoprefix = require('less-plugin-autoprefix'),
  q = require('q'),
  glob = require('glob'),
  config = require('./lib/config');


gulp.task('less', () => {
  let autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
  config.less.plugins = [autoprefix];
  return gulp.src('public/less/*.less')
  .pipe(less(config.less))
  .pipe(gulp.dest('public/css'));
});

gulp.task('connect', () => {
  connect.server(config.livereload);
});

gulp.task('html', () => {
  return gulp.src('./public/*.html')
  .pipe(connect.reload());
});

gulp.task('watch', ['connect'], () => {
  gulp.watch('public/**/*.html', ['html']);
  gulp.watch('public/**/*.less', ['less', 'html']);
});

gulp.task('server', ['less', 'watch'], () => {
  //nodemon(config.nodemon);
});

gulp.task('s', ['server']);

function getPromise() {
  let deferred = q.defer();
  deferred.resolve();
  return deferred.promise;
}
