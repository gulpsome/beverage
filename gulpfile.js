var gulp = require('./index.es5.js')(require('gulp'), {
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
