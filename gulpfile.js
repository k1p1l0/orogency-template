'use strict';

var gulp = require('gulp');  
var styl = require('gulp-styl');  
var htmlreplace = require('gulp-html-replace');

gulp.task('default', function() {  
    gulp.run('scripts', 'styles', 'html', 'vendors');
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

gulp.task('html', function() {  
	gulp.src('index.html')
	    .pipe(htmlreplace({
	        'css': 'css/styles.min.css'
	    }))
	    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {  
    gulp.src(['src/js/*.js'])
        .pipe(gulp.dest('build/js'))
});

gulp.task('styles', function() {  
    gulp.src(['src/**/**/*.css'])
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build'))
        .once('end', function () {
      		process.exit();
    	});
});

// gulp.watch('src/css/**', function() {  
//     gulp.run('styles');
// });