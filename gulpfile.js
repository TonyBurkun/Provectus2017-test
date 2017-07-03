'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    cssImport = require('gulp-cssimport'),
    cssmin = require('gulp-minify-css'),
    reload = browserSync.reload;


var path = {
	app: {
		html: 'app/',
		js: 'app/js/',
		css: 'app/css/',
		img: 'app/img/',
		fonts: 'app/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/css/**/styles.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/**/*.js',
		style: 'src/css/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './app'
};

var config = {
    server: {
        baseDir: "./app"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "provectus_test"
};

// HTML
gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.app.html))
		.pipe(reload({stream: true}));
});

// JS
gulp.task('js:build', function(){
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.app.js))
        .pipe(reload({stream: true}));
});

// CSS
gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init()) 
        .pipe(cssImport())
        .pipe(sass())
        .pipe(autoprefixer({
        	 browsers: ['last 2 versions']
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.app.css))
        .pipe(reload({stream: true}));
});

// IMG
gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(gulp.dest(path.app.img))
        .pipe(reload({stream: true}));
});

// FONTS
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.app.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);







