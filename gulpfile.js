'use strict';
const gulp = require("gulp"),
      // concat = require("gulp-concat"),
      // del = require('del'),
      exec = require('child_process').exec
;

// gulp.task('clean', (cb)=> {
//   // return del(['./tmp/*.*'], cb)
//   return del(['./tmp/*.*', './dist/*.*'], cb)
// });

// html ==============================
gulp.task('build:html', (cb)=> {
  return gulp.src(['src/*.html'])
  .pipe(gulp.dest('dist/'));
})

gulp.task('watch:html', (cb)=> {
  return gulp.watch('src/*.html', ['build:html'])
})

// css ==============================
gulp.task('build:css', (cb)=> {
  exec('npm run lessc', (err, stdout, stderr)=> {
    cb(err);
  });
})

gulp.task('watch:css', (cb)=> {
  return gulp.watch('./assets/**/*.less', ['build:css']);
})

// js ==============================
gulp.task('js:concat:lib', (cb)=> {
  return gulp.src([
    'src/assets/scripts/lib/*.js',
    'src/assets/scripts/*.js'
  ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('tmp'));
})

gulp.task('js:minify', ['js:concat:lib'], (cb)=> {
  exec('npm run js:minify', (err, stdout, stderr)=> {
    cb(err);
  });
})

gulp.task('watch:js', (cb)=> {
  return gulp.watch('./src/**/*.js', ['js:minify']);
})

// その他アセット類 ==============================


// App ==============================

// TODO: 全ビルド clean -> css/js/assets -> end
// gulp.task('build', ['clean'], (cb)=> {
  // return gulp.src(['js:minify'])
// })