require('./index.js')(require('gulp'), {
  test: {},
  sourcegate: [{recipe: 'jscs'}, {recipe: 'jshint'}],
  sourcegatePreset: 'airbnb'
})
