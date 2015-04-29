var gulp = require('./index.js')(require('gulp'), {
  test: {},
  sourcegate: [{recipe: 'jscs'}, {recipe: 'jshint'}],
  sourcegatePreset: 'airbnb'
})

gulp.task('dev', 'DEVELOP', [
  'sourcegate:watch'
])
