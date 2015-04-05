var gulp = require('./index.js')(require('gulp'), {
  scripts: {},
  buildWatch: ['sourcegates.coffee'],
})

gulp.task('dev', 'DEVELOP', ['build', 'build:watch'])
