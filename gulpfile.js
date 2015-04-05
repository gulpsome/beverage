var gulp = require('./index.js')(require('gulp'), {
  buildWatch: ['sourcegates.coffee'],
})

gulp.task('dev', 'DEVELOP', ['build', 'build:watch'])
