var gulp = require('./index.js')(require('gulp'))

gulp.task('dev', 'DEVELOP', [
  'build',
  'sourcegate:watch',
  'build:watch'
])
