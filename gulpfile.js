var gulp = require('./beverage.es5.js')(require('gulp'), {
  dotBeverage: [
    'node_modules/hal-rc',
    '.'
  ]
})

gulp.task('dev', 'DEVELOP', [
  'build',
  'build:watch'
])
