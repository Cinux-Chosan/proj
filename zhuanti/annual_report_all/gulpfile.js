(function() {
    var gulp = require('gulp'),
        // nodemon = require('gulp-nodemon'),
        connect = require('gulp-connect'),
        cleanCSS = require('gulp-clean-css'),
        less = require('gulp-less'),
        LessAutoprefix = require('less-plugin-autoprefix'),
        autoprefix = new LessAutoprefix({
            browsers: ['last 2 versions']
        });

    gulp.task('connect', () => {
        connect.server({
            port: 80,
            livereload: {
              // port: 80
            },
            // root: 'public'
        });
    });

    gulp.task('html', () => {
        return gulp.src('./*.html')
            .pipe(connect.reload());
    });
    gulp.task('build_less', function() {
        return gulp.src('./public/less/**/*.{less,css}')
            .pipe(less({
                plugins: [autoprefix]
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./public/css/'));
    });

    gulp.task('default', ['connect'], function() {
        gulp.watch('public/less/*.{less,css}', ['build_less', 'html']);
        gulp.watch('./*.{js,html}', ['html']);
    });
})();
