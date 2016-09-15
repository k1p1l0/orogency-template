'use strict';

var gulp = require('gulp');  
var styl = require('gulp-styl');  
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

gulp.task('default', function() {  
    gulp.run('html', 'vendors', 'scripts', 'styles', 'copyfonts', 'copyimg');
});

gulp.task('clean', function(){
     return del('build/**', {force:true});
});

gulp.task('vendors', function() {
	gulp.run('bootstrap', 'jquery', 'tether')
})

gulp.task('bootstrap', function() {
    return gulp.src('bower_components/bootstrap/dist/**/*.min.{js,css}')
   		.pipe(gulp.dest('src'))
});

gulp.task('jquery', function() {
    return gulp.src('bower_components/jquery/dist/**/*.min.{js,css}')
   		.pipe(gulp.dest('src/js'))
});

gulp.task('tether', function() {
    return gulp.src('bower_components/tether/dist/**/*.min.{js,css}')
   		.pipe(gulp.dest('src'))
});

gulp.task('copyimg', function() {
   gulp.src(['src/images/**/**/*.{png,jpg}'])
	.pipe(gulp.dest('build/images'));
});

gulp.task('copyfonts', function() {
   gulp.src(['src/fonts/**/*.*'])
	.pipe(gulp.dest('build/fonts'));
});

gulp.task('html', function() {  
	gulp.src('index.html')
	    .pipe(htmlreplace({
	        'css': 'css/bundle.css',
	         'js': 'js/all.js'
	    }))
	    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {  
    gulp.src(['src/js/jquery.min.js', 'src/js/tether.min.js', 'src/js/bootstrap.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('styles', function() {  
    gulp.src(['src/**/**/*.css'])
     	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(styl({compress : true}))
        .pipe(concatCss("css/bundle.css"))
        .pipe(gulp.dest('build'))
        .once('end', function () {
      		process.exit();
    	});
});

// gulp.watch('src/css/**', function() {  
//     gulp.run('styles');
// });