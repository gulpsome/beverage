var gulp = require('./index.js')(require('gulp'), {
  scripts: {include: {build: 'sourcegates.js'}},
  buildWatch: ['sourcegates.coffee'],
  test: {},
  testWatch: ['sourcegates.js', 'test/*.coffee'],
  sourcegate: [{recipe: 'jscs'}, {recipe: 'jshint'}],
  sourcegatePreset: 'airbnb'
})

gulp.task('dev', 'DEVELOP', [
  'build',
  'sourcegate:watch',
  'build:watch',
  'test:watch'
])
