'use strict';

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var req = (0, _beGoods.prefquire)({ dev: true, exitOnError: true });

// NOTE: gulp is a dependency (rather than devDependency) on purpose (a fallback default)
// perhaps there should be a warning - do `gulp` vs `beverage` commands behave differently?

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

module.exports = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = (0, _beGoods.gulpHelpify)(gulpIn);

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
    req('hal-rc')(_ramda2.default.pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2.default.pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBSSxNQUFNLHdCQUFVLEVBQUMsS0FBSyxJQUFOLEVBQVksYUFBYSxJQUF6QixFQUFWLENBQVY7Ozs7O0FBRUEsU0FBUyxHQUFULEdBQXlCO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQ3ZCLE9BQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsSUFBb0IsQ0FDckMsMkNBRHFDLEVBRXJDLEdBRnFDLENBQXZDOztBQUtBLE1BQUksSUFBSSwwQkFBVyxDQUFDO0FBQ2xCLGFBQVM7QUFDUCxxQkFBZTtBQURSO0FBRFMsR0FBRCxFQUloQixNQUpnQixDQUlULEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQjtBQUFBLFdBQVEsT0FBTyxZQUFmO0FBQUEsR0FBckIsQ0FKUyxFQUkwQyxJQUoxQyxDQUFYLENBQVI7O0FBTUEsTUFBSSxFQUFFLGNBQUYsQ0FBaUIsTUFBakIsS0FBNEIsc0JBQVEsZUFBUixDQUFoQyxFQUEwRDs7O0FBR3hELFdBQU8sMEJBQVcsQ0FBQztBQUNqQixlQUFTLEVBQUMsU0FBUyxDQUFDLE1BQUQsQ0FBVixFQURRO0FBRWpCLFlBQU07QUFDSixpQkFBUztBQURMO0FBRlcsS0FBRCxFQUtmLENBTGUsQ0FBWCxDQUFQO0FBTUQsR0FURCxNQVNPO0FBQ0wsV0FBTyxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCO0FBQ3ZDLE1BQUksSUFBSSxJQUFJLElBQUosQ0FBUjtBQUNBLE1BQUksT0FBTywwQkFBWSxNQUFaLENBQVg7O0FBRUEsT0FBSyxJQUFMLENBQVUsVUFBVixFQUFzQiw4QkFBdEIsRUFBc0QsWUFBTTtBQUMxRCxZQUFRLEdBQVIsQ0FBWSw2QkFBWjtBQUNBLFlBQVEsR0FBUixDQUFZLE9BQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixJQUFsQixFQUF3QixDQUF4QixDQUFQLEdBQW9DLElBQWhEO0FBQ0QsR0FIRDs7QUFLQSxNQUFJLGFBQUksT0FBUixFQUFpQjtBQUNmLFFBQUksRUFBRSxPQUFOLEVBQWUsSUFBSSxjQUFKLEVBQW9CLElBQXBCLEVBQTBCLEVBQUUsT0FBNUI7O0FBRWYsUUFBSSxFQUFFLElBQUYsSUFBVSxhQUFJLE9BQUosQ0FBWSxJQUExQixFQUFnQztBQUM5QixVQUFJLGVBQUosRUFBcUIsSUFBckIsRUFBMkIsRUFBRSxJQUE3QjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSSxFQUFFLFVBQUYsSUFBZ0IsRUFBRSxVQUFGLENBQWEsTUFBakMsRUFBeUM7QUFDdkMsTUFBRSxTQUFGLEdBQWMsRUFBRSxTQUFGLElBQWUsRUFBN0I7QUFDQSxRQUFJLFFBQUosRUFBYyxnQkFBRSxJQUFGLENBQU8sQ0FBQyxZQUFELEVBQWUsV0FBZixDQUFQLEVBQW9DLENBQXBDLENBQWQsRUFBc0QsSUFBdEQ7QUFDRDs7QUFFRCxNQUFJLEVBQUUsSUFBTixFQUFZLElBQUksV0FBSixFQUFpQixJQUFqQixFQUF1QixnQkFBRSxJQUFGLENBQU8sQ0FBQyxNQUFELENBQVAsRUFBaUIsQ0FBakIsQ0FBdkI7O0FBRVosTUFBSSxFQUFFLFNBQU4sRUFBaUIsSUFBSSxZQUFKLEVBQWtCLElBQWxCLEVBQXdCLEVBQUUsU0FBMUI7O0FBRWpCLFNBQU8sSUFBUDtBQUNELENBM0JEIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG4vLyBOT1RFOiBndWxwIGlzIGEgZGVwZW5kZW5jeSAocmF0aGVyIHRoYW4gZGV2RGVwZW5kZW5jeSkgb24gcHVycG9zZSAoYSBmYWxsYmFjayBkZWZhdWx0KVxuLy8gcGVyaGFwcyB0aGVyZSBzaG91bGQgYmUgYSB3YXJuaW5nIC0gZG8gYGd1bHBgIHZzIGBiZXZlcmFnZWAgY29tbWFuZHMgYmVoYXZlIGRpZmZlcmVudGx5P1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3ByZWZxdWlyZSwgcGtnLCBpc0xvY2FsLCBndWxwSGVscGlmeX0gZnJvbSAnYmUtZ29vZHMnXG5cbmxldCByZXEgPSBwcmVmcXVpcmUoe2RldjogdHJ1ZSwgZXhpdE9uRXJyb3I6IHRydWV9KVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAnLidcbiAgXVxuXG4gIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgIHNjcmlwdHM6IHtcbiAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICB9XG4gIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICBpZiAoby5oYXNPd25Qcm9wZXJ0eSgndGVzdCcpICYmIGlzTG9jYWwoJ2d1bHAtbnBtLXRlc3QnKSkge1xuICAgIC8vIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgIC8vIE5PVEU6IGRvbid0IGJlIHB1dC1vZmYgYnkgYHNwZWMuY29mZmVlYCBhbmQgY2hhbmdlIGl0IHRvIG1hdGNoIHlvdXIgdGVzdHNcbiAgICByZXR1cm4gc291cmNlZ2F0ZShbe1xuICAgICAgc2NyaXB0czoge2V4Y2x1ZGU6IFsndGVzdCddfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogJ1xcXFwuc3BlY1xcXFwuY29mZmVlJCdcbiAgICAgIH1cbiAgICB9LCBvXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGd1bHBJbiwgb3B0cykge1xuICBsZXQgbyA9IGRlZihvcHRzKVxuICBsZXQgZ3VscCA9IGd1bHBIZWxwaWZ5KGd1bHBJbilcblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICByZXEoJ2hhbC1yYycpKFIucGljayhbJ3NvdXJjZWdhdGUnLCAnc291cmNlb3B0J10sIG8pLCBndWxwKVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxKCdndWxwLWhhcnAnKShndWxwLCBSLnBpY2soWydoYXJwJ10sIG8pKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==