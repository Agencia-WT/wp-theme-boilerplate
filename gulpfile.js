/**
 *
 * Run: $ gulp
 *
 * */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var imageop = require('gulp-image-optimization');

gulp.task('serve', ['sass','images','coffee'], function () {

    browserSync.init({
        proxy: "http://wptest.dev",
        port: 5000
    });

    gulp.watch("assets/sass/**/*.scss", ['sass']);
    gulp.watch("assets/coffee/**/*.coffee", ['coffee']);
    gulp.watch([
            'assets/img/**/*.png',
            'assets/img/**/*.jpg',
            'assets/img/**/*.gif',
            'assets/img/**/*.jpeg'], ['images']);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("*.php").on('change', browserSync.reload);
    gulp.watch("**/*.php").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src("assets/sass/*.scss")
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function () {
    gulp.src('assets/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./public/js/'))
});

gulp.task('images', function (cb) {
    gulp.src([
            'assets/img/**/*.png',
            'assets/img/**/*.jpg',
            'assets/img/**/*.gif',
            'assets/img/**/*.jpeg'])
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })).pipe(gulp.dest('public/img')).on('end', cb).on('error', cb);
});

gulp.task('default', ['serve']);
