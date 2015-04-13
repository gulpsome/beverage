var gulp = require('./index.js')(require('gulp'), {
  scripts: {},
  buildWatch: ['sourcegates.coffee'],
  test: {},
  testWatch: ['sourcegates.js', 'test/*.coffee'],
  sourcegate: [{recipe: 'jscs'}, {recipe: 'jshint'}],
  sourcegatePreset: 'airbnb'
})

gulp.task('dev', 'DEVELOP', [
  'build',
  'test',
  'sourcegate:watch',
  'build:watch',
  'test:watch'
])
