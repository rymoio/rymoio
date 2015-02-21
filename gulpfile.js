// Include Gulp
var gulp = require('gulp'),
    pkg  = require('./package.json');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/g,
    rename: {
        'gulp-minify-css': 'css',
        'gulp-ruby-sass': 'sass'
    }
});

// Shared task variables
var assets = 'assets/',
    banner = [
        '/*! ***************************************************',
        ' *                __',
        ' *               / _)  <%= pkg.name %>',
        ' *        .-^^^-/ /',
        ' *     __/       /',
        ' *    <__.|_|-|_|',
        ' *',
        ' *    <%= pkg.description %>',
        ' *',
        ' *    @version : <%= pkg.version %>',
        ' *    @author  : <%= pkg.author %>',
        ' *    @license : <%= pkg.license %>',
        ' *    @link    : <%= pkg.homepage %>',
        ' *',
        ' * ************************************************** !*/',
        ''
    ].join('\n');

// Task :: Sass
gulp.task('sass',function() {
    var sassFiles = [
        'src/_dev/scss/main.scss'
    ];
    var filename = 'main.min.css';

    return plugins.sass(sassFiles, {
            precision: 8,
            verbose: true
        })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(plugins.css())
        .pipe(plugins.concat(filename))
        .pipe(plugins.header(banner, {pkg: pkg, f: filename}))
        .pipe(gulp.dest(assets + 'css'));
});

// Task :: Images
gulp.task('images', function () {
    var imgFiles = [
        'src/_dev/img/snowy_portrait.png'
    ];
    return gulp.src(imgFiles)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(assets + 'img'))
        .on('error', plugins.util.log);
});

// Task :: Fonts
gulp.task('fonts', function() {
    var fontFiles = [
        'src/_lib/fontawesome/fonts/fontawesome-webfont.eot',
        'src/_lib/fontawesome/fonts/fontawesome-webfont.svg',
        'src/_lib/fontawesome/fonts/fontawesome-webfont.ttf',
        'src/_lib/fontawesome/fonts/fontawesome-webfont.woff',
        'src/_lib/fontawesome/fonts/fontawesome-webfont.woff2',
    ];

    return gulp.src(fontFiles)
        .pipe(gulp.dest(assets + 'fonts'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(['src/_dev/scss/*.scss'], ['sass']);
    gulp.watch(['src/_dev/img/*'], ['images']);
});

// Task :: Default
gulp.task('default', ['watch', 'sass', 'images', 'fonts']);