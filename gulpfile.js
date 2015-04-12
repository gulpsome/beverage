var gulp = require('./index.js')(require('gulp'), {
  scripts: {},
  buildWatch: ['sourcegates.coffee'],
  test: {},
  testWatch: ['sourcegates.js', 'test/*.coffee'],
  sourcegate: [{recipe: 'jshint', sources: {node: true}}]
})

gulp.task('dev', 'DEVELOP', [
  'sourcegate',
  'build',
  'test',
  'sourcegate:watch',
  'build:watch',
  'test:watch'
])
