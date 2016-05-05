'use strict';

require('source-map-support/register');

var _beGoods = require('be-goods');

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var req = (0, _beGoods.prefquire)({ dev: true, exitOnError: true });

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2.default)([{
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.hasOwnProperty('test') && (0, _beGoods.isLocal)('gulp-npm-test')) {
    // gulp-npm-test does testing better than gulp-npm-run
    // NOTE: don't be put-off by `spec.coffee` and change it to match your tests
    return (0, _sourcegate2.default)([{
      scripts: { exclude: ['test'] },
      test: {
        testsRe: '\\.spec\\.coffee$'
      }
    }, o]);
  } else {
    return o;
  }
}

module.exports = function (first, second) {
  var gulp = void 0,
      o = void 0;
  if ((0, _beGoods.isGulp)(first)) {
    gulp = (0, _beGoods.gulpHelpify)(first);
    o = def(second);
  } else {
    // NOTE: gulp must be locally installed (relative to gulpfile.js / cwd).
    // Gulp insists on it. Both gulp-cli and beverage-cli enforce it.
    gulp = (0, _beGoods.gulpHelpify)(req('gulp', { forceLocal: true }));
    o = def(first);
  }

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_beGoods.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _beGoods.pkg.scripts.test) {
      req('gulp-npm-test', { forceLocal: true })(gulp, o.test);
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {};
    req('hal-rc')((0, _lodash2.default)(o, ['sourcegate', 'sourceopt']), gulp);
  }

  if (o.harp) req('gulp-harp', { forceLocal: true })(gulp, (0, _lodash2.default)(o, ['harp']));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJldmVyYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxNQUFNLHdCQUFVLEVBQUMsS0FBSyxJQUFOLEVBQVksYUFBYSxJQUF6QixFQUFWLENBQVY7O0FBRUEsU0FBUyxHQUFULEdBQXlCO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQ3ZCLE9BQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsSUFBb0IsQ0FDckMsMkNBRHFDLEVBRXJDLEdBRnFDLENBQXZDOztBQUtBLE1BQUksSUFBSSwwQkFBVyxDQUFDO0FBQ2xCLGFBQVM7QUFDUCxxQkFBZTtBQURSO0FBRFMsR0FBRCxFQUloQixNQUpnQixDQUlULEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQjtBQUFBLFdBQVEsT0FBTyxZQUFmO0FBQUEsR0FBckIsQ0FKUyxFQUkwQyxJQUoxQyxDQUFYLENBQVI7O0FBTUEsTUFBSSxFQUFFLGNBQUYsQ0FBaUIsTUFBakIsS0FBNEIsc0JBQVEsZUFBUixDQUFoQyxFQUEwRDs7O0FBR3hELFdBQU8sMEJBQVcsQ0FBQztBQUNqQixlQUFTLEVBQUMsU0FBUyxDQUFDLE1BQUQsQ0FBVixFQURRO0FBRWpCLFlBQU07QUFDSixpQkFBUztBQURMO0FBRlcsS0FBRCxFQUtmLENBTGUsQ0FBWCxDQUFQO0FBTUQsR0FURCxNQVNPO0FBQ0wsV0FBTyxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBVSxLQUFWLEVBQWlCLE1BQWpCLEVBQXlCO0FBQ3hDLE1BQUksYUFBSjtNQUFVLFVBQVY7QUFDQSxNQUFJLHFCQUFPLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixXQUFPLDBCQUFZLEtBQVosQ0FBUDtBQUNBLFFBQUksSUFBSSxNQUFKLENBQUo7QUFDRCxHQUhELE1BR087OztBQUdMLFdBQU8sMEJBQVksSUFBSSxNQUFKLEVBQVksRUFBQyxZQUFZLElBQWIsRUFBWixDQUFaLENBQVA7QUFDQSxRQUFJLElBQUksS0FBSixDQUFKO0FBQ0Q7O0FBRUQsT0FBSyxJQUFMLENBQVUsVUFBVixFQUFzQiw4QkFBdEIsRUFBc0QsWUFBTTtBQUMxRCxZQUFRLEdBQVIsQ0FBWSw2QkFBWjtBQUNBLFlBQVEsR0FBUixDQUFZLE9BQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixJQUFsQixFQUF3QixDQUF4QixDQUFQLEdBQW9DLElBQWhEO0FBQ0QsR0FIRDs7QUFLQSxNQUFJLGFBQUksT0FBUixFQUFpQjtBQUNmLFFBQUksRUFBRSxPQUFOLEVBQWUsSUFBSSxjQUFKLEVBQW9CLElBQXBCLEVBQTBCLEVBQUUsT0FBNUI7O0FBRWYsUUFBSSxFQUFFLElBQUYsSUFBVSxhQUFJLE9BQUosQ0FBWSxJQUExQixFQUFnQztBQUM5QixVQUFJLGVBQUosRUFBcUIsRUFBQyxZQUFZLElBQWIsRUFBckIsRUFBeUMsSUFBekMsRUFBK0MsRUFBRSxJQUFqRDtBQUNEO0FBQ0Y7O0FBRUQsTUFBSSxFQUFFLFVBQUYsSUFBZ0IsRUFBRSxVQUFGLENBQWEsTUFBakMsRUFBeUM7QUFDdkMsTUFBRSxTQUFGLEdBQWMsRUFBRSxTQUFGLElBQWUsRUFBN0I7QUFDQSxRQUFJLFFBQUosRUFBYyxzQkFBSyxDQUFMLEVBQVEsQ0FBQyxZQUFELEVBQWUsV0FBZixDQUFSLENBQWQsRUFBb0QsSUFBcEQ7QUFDRDs7QUFFRCxNQUFJLEVBQUUsSUFBTixFQUFZLElBQUksV0FBSixFQUFpQixFQUFDLFlBQVksSUFBYixFQUFqQixFQUFxQyxJQUFyQyxFQUEyQyxzQkFBSyxDQUFMLEVBQVEsQ0FBQyxNQUFELENBQVIsQ0FBM0M7O0FBRVosTUFBSSxFQUFFLFNBQU4sRUFBaUIsSUFBSSxZQUFKLEVBQWtCLElBQWxCLEVBQXdCLEVBQUUsU0FBMUI7O0FBRWpCLFNBQU8sSUFBUDtBQUNELENBbkNEIiwiZmlsZSI6ImJldmVyYWdlLmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQge3ByZWZxdWlyZSwgcGtnLCBpc0xvY2FsLCBpc0d1bHAsIGd1bHBIZWxwaWZ5fSBmcm9tICdiZS1nb29kcydcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gucGljaydcblxubGV0IHJlcSA9IHByZWZxdWlyZSh7ZGV2OiB0cnVlLCBleGl0T25FcnJvcjogdHJ1ZX0pXG5cbmZ1bmN0aW9uIGRlZiAob3B0cyA9IHt9KSB7XG4gIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICcuJ1xuICBdXG5cbiAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgc2NyaXB0czoge1xuICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgIH1cbiAgfV0uY29uY2F0KG9wdHMuZG90QmV2ZXJhZ2UubWFwKGZpbGUgPT4gZmlsZSArICcvLmJldmVyYWdlJyksIG9wdHMpKVxuXG4gIGlmIChvLmhhc093blByb3BlcnR5KCd0ZXN0JykgJiYgaXNMb2NhbCgnZ3VscC1ucG0tdGVzdCcpKSB7XG4gICAgLy8gZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgLy8gTk9URTogZG9uJ3QgYmUgcHV0LW9mZiBieSBgc3BlYy5jb2ZmZWVgIGFuZCBjaGFuZ2UgaXQgdG8gbWF0Y2ggeW91ciB0ZXN0c1xuICAgIHJldHVybiBzb3VyY2VnYXRlKFt7XG4gICAgICBzY3JpcHRzOiB7ZXhjbHVkZTogWyd0ZXN0J119LFxuICAgICAgdGVzdDoge1xuICAgICAgICB0ZXN0c1JlOiAnXFxcXC5zcGVjXFxcXC5jb2ZmZWUkJ1xuICAgICAgfVxuICAgIH0sIG9dKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICBsZXQgZ3VscCwgb1xuICBpZiAoaXNHdWxwKGZpcnN0KSkge1xuICAgIGd1bHAgPSBndWxwSGVscGlmeShmaXJzdClcbiAgICBvID0gZGVmKHNlY29uZClcbiAgfSBlbHNlIHtcbiAgICAvLyBOT1RFOiBndWxwIG11c3QgYmUgbG9jYWxseSBpbnN0YWxsZWQgKHJlbGF0aXZlIHRvIGd1bHBmaWxlLmpzIC8gY3dkKS5cbiAgICAvLyBHdWxwIGluc2lzdHMgb24gaXQuIEJvdGggZ3VscC1jbGkgYW5kIGJldmVyYWdlLWNsaSBlbmZvcmNlIGl0LlxuICAgIGd1bHAgPSBndWxwSGVscGlmeShyZXEoJ2d1bHAnLCB7Zm9yY2VMb2NhbDogdHJ1ZX0pKVxuICAgIG8gPSBkZWYoZmlyc3QpXG4gIH1cblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0Jywge2ZvcmNlTG9jYWw6IHRydWV9KShndWxwLCBvLnRlc3QpXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSB7XG4gICAgby5zb3VyY2VvcHQgPSBvLnNvdXJjZW9wdCB8fCB7fVxuICAgIHJlcSgnaGFsLXJjJykocGljayhvLCBbJ3NvdXJjZWdhdGUnLCAnc291cmNlb3B0J10pLCBndWxwKVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxKCdndWxwLWhhcnAnLCB7Zm9yY2VMb2NhbDogdHJ1ZX0pKGd1bHAsIHBpY2sobywgWydoYXJwJ10pKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==