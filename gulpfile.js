/**
 *
 * Run: 
 * $ npm install
 * $ bower install
 * $ gulp
 * 
 * 
 * Folder structure
 * 
 * Source
 * ./assets
 *      => coffee/
 *      => sass/
 *      => img/
 *
 * Dist
 * ./public
 *      => js/
 *      => css/
 *      => img/
 *
 * */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imageop = require('gulp-image-optimization');

gulp.task('serve', ['sass','images','coffee'], function () {

    browserSync.init({
        proxy: "http://boilerplate.dev",
        port: 5000
    });

    gulp.watch("assets/sass/**/*.scss", ['sass']);
    gulp.watch("assets/coffee/**/*.coffee", ['coffee', 'js-concat']);
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
        .pipe(rename('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function () {
    gulp.src('assets/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./public/js/src'))
});

gulp.task('js-concat', function () {
    return gulp.src("public/js/src/*")
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
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
