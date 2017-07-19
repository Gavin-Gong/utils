const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const del = require('del')
const colors = require('colors')

const distDir = './dist'

// compile scss
gulp.task('scss:compile', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(distDir))
})

// lint js
gulp.task('js:lint', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.result(result => {
      console.log(JSON.stringify(result))
    }))
})
// complile es6
gulp.task('js', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.result(result => {
      if (result.errorCount) {
        console.log(colors.yellow(`you has ${result.errorCount} errors in ${result.filePath}`))
      }
      result.messages.forEach(item => {
        console.log(colors.yellow(`rule: ${item.ruleId}`))
        console.log(colors.yellow(`line: ${item.line}, column: ${item.column}: `))
        console.log(colors.yellow(item.source))
        console.log('\n')
      })
    }))
    .pipe(babel({
      'presets': ['es2015']
    }))
    .on('error', (err) => {
      console.log(colors.red(`error: ${err.message}`))
      console.log('\n')
    })
    .pipe(gulp.dest(distDir))
})
gulp.task('copy', () => {
  return gulp.src(['src/**/*', '!src/**/*.scss', '!src/**/*.less', '!src/**/*.js'])
    .pipe(gulp.dest(distDir))
})
gulp.task('clean', () => {
  return del([`${distDir}/*`]).then(res => {
    console.log('clean dist dir')
  })
})

gulp.task('default', gulp.parallel('scss:compile', 'js', 'copy', () => {
  // console.log('finish build')
  // watch src dir
  gulp.watch('./src/**/*', gulp.series('default', 'copy', () => {
    console.log('finish build')
  }))
}))

// gulp.task('newPage')
