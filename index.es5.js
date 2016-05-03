'use strict';

require('source-map-support/register');

var _beGoods = require('be-goods');

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var req = (0, _beGoods.prefquire)({ dev: true, exitOnError: true });

// NOTE: gulp is a dependency (rather than devDependency) on purpose (a fallback default)

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
    gulp = (0, _beGoods.gulpHelpify)(req('gulp'));
    o = def(first);
  }

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_beGoods.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _beGoods.pkg.scripts.test) {
      req('gulp-npm-test')(gulp, o.test);
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {};
    req('hal-rc')((0, _lodash2.default)(o, ['sourcegate', 'sourceopt']), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, (0, _lodash2.default)(o, ['harp']));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBSUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxNQUFNLHdCQUFVLEVBQUMsS0FBSyxJQUFOLEVBQVksYUFBYSxJQUF6QixFQUFWLENBQVY7Ozs7QUFFQSxTQUFTLEdBQVQsR0FBeUI7QUFBQSxNQUFYLElBQVcseURBQUosRUFBSTs7QUFDdkIsT0FBSyxXQUFMLEdBQW1CLEtBQUssV0FBTCxJQUFvQixDQUNyQywyQ0FEcUMsRUFFckMsR0FGcUMsQ0FBdkM7O0FBS0EsTUFBSSxJQUFJLDBCQUFXLENBQUM7QUFDbEIsYUFBUztBQUNQLHFCQUFlO0FBRFI7QUFEUyxHQUFELEVBSWhCLE1BSmdCLENBSVQsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCO0FBQUEsV0FBUSxPQUFPLFlBQWY7QUFBQSxHQUFyQixDQUpTLEVBSTBDLElBSjFDLENBQVgsQ0FBUjs7QUFNQSxNQUFJLEVBQUUsY0FBRixDQUFpQixNQUFqQixLQUE0QixzQkFBUSxlQUFSLENBQWhDLEVBQTBEOzs7QUFHeEQsV0FBTywwQkFBVyxDQUFDO0FBQ2pCLGVBQVMsRUFBQyxTQUFTLENBQUMsTUFBRCxDQUFWLEVBRFE7QUFFakIsWUFBTTtBQUNKLGlCQUFTO0FBREw7QUFGVyxLQUFELEVBS2YsQ0FMZSxDQUFYLENBQVA7QUFNRCxHQVRELE1BU087QUFDTCxXQUFPLENBQVA7QUFDRDtBQUNGOztBQUVELE9BQU8sT0FBUCxHQUFpQixVQUFVLEtBQVYsRUFBaUIsTUFBakIsRUFBeUI7QUFDeEMsTUFBSSxhQUFKO01BQVUsVUFBVjtBQUNBLE1BQUkscUJBQU8sS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFdBQU8sMEJBQVksS0FBWixDQUFQO0FBQ0EsUUFBSSxJQUFJLE1BQUosQ0FBSjtBQUNELEdBSEQsTUFHTztBQUNMLFdBQU8sMEJBQVksSUFBSSxNQUFKLENBQVosQ0FBUDtBQUNBLFFBQUksSUFBSSxLQUFKLENBQUo7QUFDRDs7QUFFRCxPQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLDhCQUF0QixFQUFzRCxZQUFNO0FBQzFELFlBQVEsR0FBUixDQUFZLDZCQUFaO0FBQ0EsWUFBUSxHQUFSLENBQVksT0FBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLElBQWxCLEVBQXdCLENBQXhCLENBQVAsR0FBb0MsSUFBaEQ7QUFDRCxHQUhEOztBQUtBLE1BQUksYUFBSSxPQUFSLEVBQWlCO0FBQ2YsUUFBSSxFQUFFLE9BQU4sRUFBZSxJQUFJLGNBQUosRUFBb0IsSUFBcEIsRUFBMEIsRUFBRSxPQUE1Qjs7QUFFZixRQUFJLEVBQUUsSUFBRixJQUFVLGFBQUksT0FBSixDQUFZLElBQTFCLEVBQWdDO0FBQzlCLFVBQUksZUFBSixFQUFxQixJQUFyQixFQUEyQixFQUFFLElBQTdCO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJLEVBQUUsVUFBRixJQUFnQixFQUFFLFVBQUYsQ0FBYSxNQUFqQyxFQUF5QztBQUN2QyxNQUFFLFNBQUYsR0FBYyxFQUFFLFNBQUYsSUFBZSxFQUE3QjtBQUNBLFFBQUksUUFBSixFQUFjLHNCQUFLLENBQUwsRUFBUSxDQUFDLFlBQUQsRUFBZSxXQUFmLENBQVIsQ0FBZCxFQUFvRCxJQUFwRDtBQUNEOztBQUVELE1BQUksRUFBRSxJQUFOLEVBQVksSUFBSSxXQUFKLEVBQWlCLElBQWpCLEVBQXVCLHNCQUFLLENBQUwsRUFBUSxDQUFDLE1BQUQsQ0FBUixDQUF2Qjs7QUFFWixNQUFJLEVBQUUsU0FBTixFQUFpQixJQUFJLFlBQUosRUFBa0IsSUFBbEIsRUFBd0IsRUFBRSxTQUExQjs7QUFFakIsU0FBTyxJQUFQO0FBQ0QsQ0FqQ0QiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbi8vIE5PVEU6IGd1bHAgaXMgYSBkZXBlbmRlbmN5IChyYXRoZXIgdGhhbiBkZXZEZXBlbmRlbmN5KSBvbiBwdXJwb3NlIChhIGZhbGxiYWNrIGRlZmF1bHQpXG5cbmltcG9ydCB7cHJlZnF1aXJlLCBwa2csIGlzTG9jYWwsIGlzR3VscCwgZ3VscEhlbHBpZnl9IGZyb20gJ2JlLWdvb2RzJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJ1xuXG5sZXQgcmVxID0gcHJlZnF1aXJlKHtkZXY6IHRydWUsIGV4aXRPbkVycm9yOiB0cnVlfSlcblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgJy4nXG4gIF1cblxuICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICBzY3JpcHRzOiB7XG4gICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgfVxuICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgaWYgKG8uaGFzT3duUHJvcGVydHkoJ3Rlc3QnKSAmJiBpc0xvY2FsKCdndWxwLW5wbS10ZXN0JykpIHtcbiAgICAvLyBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAvLyBOT1RFOiBkb24ndCBiZSBwdXQtb2ZmIGJ5IGBzcGVjLmNvZmZlZWAgYW5kIGNoYW5nZSBpdCB0byBtYXRjaCB5b3VyIHRlc3RzXG4gICAgcmV0dXJuIHNvdXJjZWdhdGUoW3tcbiAgICAgIHNjcmlwdHM6IHtleGNsdWRlOiBbJ3Rlc3QnXX0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6ICdcXFxcLnNwZWNcXFxcLmNvZmZlZSQnXG4gICAgICB9XG4gICAgfSwgb10pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gIGxldCBndWxwLCBvXG4gIGlmIChpc0d1bHAoZmlyc3QpKSB7XG4gICAgZ3VscCA9IGd1bHBIZWxwaWZ5KGZpcnN0KVxuICAgIG8gPSBkZWYoc2Vjb25kKVxuICB9IGVsc2Uge1xuICAgIGd1bHAgPSBndWxwSGVscGlmeShyZXEoJ2d1bHAnKSlcbiAgICBvID0gZGVmKGZpcnN0KVxuICB9XG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgcmVxKCdoYWwtcmMnKShwaWNrKG8sIFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIHBpY2sobywgWydoYXJwJ10pKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==