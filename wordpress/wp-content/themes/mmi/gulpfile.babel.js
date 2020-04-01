require('dotenv').config()

import gulp from "gulp"
import browserSync from "browser-sync"
import sourcemaps from "gulp-sourcemaps"
import plumber from "gulp-plumber"
import sass from "gulp-sass"

const notify = require('gulp-notify')
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso')
const gulpStylelint = require('gulp-stylelint');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel  = require('gulp-babel');

const paths = {
    styles: {
        watchSrc: 'assets/css/src/**/*.scss',
        src: "assets/css/src/main.scss",
        dest: 'assets/css/'
    },
    js: {
      watchSrc: 'assets/js/src/**/*.js',
      src: 'assets/js/src/*.js',
      dest: 'assets/js/'
    }
}

export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "CSS preprocessing"
        })}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({overrideBrowserslist: ['last 3 version']})]))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

const lintStyles = () => {
    return gulp.src(paths.styles.watchSrc)
        .pipe(plumber({errorHandler: notify.onError({
            message: "<%= error.message %>",
            title: "CSS preprocessing"
        })}))
        .pipe(gulpStylelint({
        reporters: [
            {formatter: 'string', console: true}
        ],
        debug: true
        }))
}

const js = () => {
  return gulp.src(paths.js.watchSrc)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest)
  )
}

const watch = () => {
    gulp.watch(paths.styles.watchSrc, lintStyles)
    gulp.watch(paths.styles.watchSrc, styles)
    gulp.watch(paths.js.watchSrc, js)
}

const initBrowserSync = () => {
    browserSync.init( {
        server: false,
        proxy: process.env.proxy ? process.env.proxy : false,
        open: false,
    } )
}

export const build = gulp.series( styles )

const dev = gulp.parallel( initBrowserSync, watch )
export default dev
