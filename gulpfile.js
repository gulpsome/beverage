var gulp = require('./index.js')(require('gulp'), {
  dotBeverage: [
    'node_modules/hal-rc',
    '.'
  ]
})

gulp.task('dev', 'DEVELOP', [
  'build',
  'sourcegate:watch',
  'build:watch'
])
