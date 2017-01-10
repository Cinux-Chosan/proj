(function() {
  var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    less = require('gulp-less'),
    LessAutoprefix  = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });


    gulp.task('build_less', function() {
      return gulp.src('./public/less/**/*.{less,css}')
      .pipe(less({plugins: [autoprefix]}))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/css/'));
    });

    gulp.task('default', function() {
      gulp.watch('public/less/*.{less,css}', ['build_less']);
    });

})();
