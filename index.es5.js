'use strict';

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import gutil from 'gulp-util'

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
    req('hal-rc')(_ramda2.default.pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2.default.pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFHQSxJQUFJLE1BQU0sd0JBQVUsRUFBQyxLQUFLLElBQU4sRUFBWSxhQUFhLElBQXpCLEVBQVYsQ0FBVjs7OztBQUVBLFNBQVMsR0FBVCxHQUF5QjtBQUFBLE1BQVgsSUFBVyx5REFBSixFQUFJOztBQUN2QixPQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUFMLElBQW9CLENBQ3JDLDJDQURxQyxFQUVyQyxHQUZxQyxDQUF2Qzs7QUFLQSxNQUFJLElBQUksMEJBQVcsQ0FBQztBQUNsQixhQUFTO0FBQ1AscUJBQWU7QUFEUjtBQURTLEdBQUQsRUFJaEIsTUFKZ0IsQ0FJVCxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUI7QUFBQSxXQUFRLE9BQU8sWUFBZjtBQUFBLEdBQXJCLENBSlMsRUFJMEMsSUFKMUMsQ0FBWCxDQUFSOztBQU1BLE1BQUksRUFBRSxjQUFGLENBQWlCLE1BQWpCLEtBQTRCLHNCQUFRLGVBQVIsQ0FBaEMsRUFBMEQ7OztBQUd4RCxXQUFPLDBCQUFXLENBQUM7QUFDakIsZUFBUyxFQUFDLFNBQVMsQ0FBQyxNQUFELENBQVYsRUFEUTtBQUVqQixZQUFNO0FBQ0osaUJBQVM7QUFETDtBQUZXLEtBQUQsRUFLZixDQUxlLENBQVgsQ0FBUDtBQU1ELEdBVEQsTUFTTztBQUNMLFdBQU8sQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLFVBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QjtBQUN4QyxNQUFJLGFBQUo7TUFBVSxVQUFWO0FBQ0EsTUFBSSxxQkFBTyxLQUFQLENBQUosRUFBbUI7QUFDakIsV0FBTywwQkFBWSxLQUFaLENBQVA7QUFDQSxRQUFJLElBQUksTUFBSixDQUFKO0FBQ0QsR0FIRCxNQUdPO0FBQ0wsV0FBTywwQkFBWSxJQUFJLE1BQUosQ0FBWixDQUFQO0FBQ0EsUUFBSSxJQUFJLEtBQUosQ0FBSjtBQUNEOztBQUVELE9BQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsOEJBQXRCLEVBQXNELFlBQU07QUFDMUQsWUFBUSxHQUFSLENBQVksNkJBQVo7QUFDQSxZQUFRLEdBQVIsQ0FBWSxPQUFPLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsSUFBbEIsRUFBd0IsQ0FBeEIsQ0FBUCxHQUFvQyxJQUFoRDtBQUNELEdBSEQ7O0FBS0EsTUFBSSxhQUFJLE9BQVIsRUFBaUI7QUFDZixRQUFJLEVBQUUsT0FBTixFQUFlLElBQUksY0FBSixFQUFvQixJQUFwQixFQUEwQixFQUFFLE9BQTVCOztBQUVmLFFBQUksRUFBRSxJQUFGLElBQVUsYUFBSSxPQUFKLENBQVksSUFBMUIsRUFBZ0M7QUFDOUIsVUFBSSxlQUFKLEVBQXFCLElBQXJCLEVBQTJCLEVBQUUsSUFBN0I7QUFDRDtBQUNGOztBQUVELE1BQUksRUFBRSxVQUFGLElBQWdCLEVBQUUsVUFBRixDQUFhLE1BQWpDLEVBQXlDO0FBQ3ZDLE1BQUUsU0FBRixHQUFjLEVBQUUsU0FBRixJQUFlLEVBQTdCO0FBQ0EsUUFBSSxRQUFKLEVBQWMsZ0JBQUUsSUFBRixDQUFPLENBQUMsWUFBRCxFQUFlLFdBQWYsQ0FBUCxFQUFvQyxDQUFwQyxDQUFkLEVBQXNELElBQXREO0FBQ0Q7O0FBRUQsTUFBSSxFQUFFLElBQU4sRUFBWSxJQUFJLFdBQUosRUFBaUIsSUFBakIsRUFBdUIsZ0JBQUUsSUFBRixDQUFPLENBQUMsTUFBRCxDQUFQLEVBQWlCLENBQWpCLENBQXZCOztBQUVaLE1BQUksRUFBRSxTQUFOLEVBQWlCLElBQUksWUFBSixFQUFrQixJQUFsQixFQUF3QixFQUFFLFNBQTFCOztBQUVqQixTQUFPLElBQVA7QUFDRCxDQWpDRCIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuLy8gTk9URTogZ3VscCBpcyBhIGRlcGVuZGVuY3kgKHJhdGhlciB0aGFuIGRldkRlcGVuZGVuY3kpIG9uIHB1cnBvc2UgKGEgZmFsbGJhY2sgZGVmYXVsdClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IHtwcmVmcXVpcmUsIHBrZywgaXNMb2NhbCwgaXNHdWxwLCBndWxwSGVscGlmeX0gZnJvbSAnYmUtZ29vZHMnXG4vLyBpbXBvcnQgZ3V0aWwgZnJvbSAnZ3VscC11dGlsJ1xuXG5sZXQgcmVxID0gcHJlZnF1aXJlKHtkZXY6IHRydWUsIGV4aXRPbkVycm9yOiB0cnVlfSlcblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgJy4nXG4gIF1cblxuICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICBzY3JpcHRzOiB7XG4gICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgfVxuICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgaWYgKG8uaGFzT3duUHJvcGVydHkoJ3Rlc3QnKSAmJiBpc0xvY2FsKCdndWxwLW5wbS10ZXN0JykpIHtcbiAgICAvLyBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAvLyBOT1RFOiBkb24ndCBiZSBwdXQtb2ZmIGJ5IGBzcGVjLmNvZmZlZWAgYW5kIGNoYW5nZSBpdCB0byBtYXRjaCB5b3VyIHRlc3RzXG4gICAgcmV0dXJuIHNvdXJjZWdhdGUoW3tcbiAgICAgIHNjcmlwdHM6IHtleGNsdWRlOiBbJ3Rlc3QnXX0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6ICdcXFxcLnNwZWNcXFxcLmNvZmZlZSQnXG4gICAgICB9XG4gICAgfSwgb10pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gIGxldCBndWxwLCBvXG4gIGlmIChpc0d1bHAoZmlyc3QpKSB7XG4gICAgZ3VscCA9IGd1bHBIZWxwaWZ5KGZpcnN0KVxuICAgIG8gPSBkZWYoc2Vjb25kKVxuICB9IGVsc2Uge1xuICAgIGd1bHAgPSBndWxwSGVscGlmeShyZXEoJ2d1bHAnKSlcbiAgICBvID0gZGVmKGZpcnN0KVxuICB9XG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgcmVxKCdoYWwtcmMnKShSLnBpY2soWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddLCBvKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5jYXVzYWxpdHkpIHJlcSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=