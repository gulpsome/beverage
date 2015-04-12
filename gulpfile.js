var gulp = require('./index.js')(require('gulp'), {
  scripts: {},
  buildWatch: ['sourcegates.coffee'],
  test: {},
  testWatch: ['sourcegates.js', 'test/*.coffee'],
  sourcegate: [{recipe: 'jshint'}]
})

gulp.task('dev', 'DEVELOP', ['sourcegate', 'build', 'test', 'build:watch', 'test:watch'])
