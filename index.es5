'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stamina = require('stamina');

require('source-map-support').install();

function def() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2['default'])([{
    build: 'build',
    scripts: {
      exclude: ['test'], // because gulp-npm-test does testing better than gulp-npm-run
      requireStrict: true
    },
    test: { // NOTE: test is always enabled because of this default -- not so good...
      testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.scripts.include && o.scripts.include[o.build]) {
    o = (0, _sourcegate2['default'])([o, { scripts: { require: [o.build] } }]);
  }

  return o;
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = (0, _stamina.gulpHelpify)(gulpIn);

  if (_stamina.pkg.scripts && o.scripts) require('gulp-npm-run')(gulpIn, o.scripts);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_stamina.pkg.scripts) {
    if (o.test && _stamina.pkg.scripts.test) {
      (function () {
        var test = require('gulp-npm-test')(gulp, o.test);

        if (o.testWatch) {
          gulp.task('test:watch', o.testWatch.toString(), function () {
            return require('gulp-watch')(o.testWatch, test);
          });
        }
      })();
    }

    if (o.buildWatch && o.scripts) {
      gulp.task(o.build + ':watch', o.buildWatch.toString(), function () {
        return gulp.watch(o.buildWatch, [o.build]);
      });
    }
  }

  if (o.harp) require('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxQkFFYyxPQUFPOzs7OzBCQUNFLFlBQVk7Ozs7b0JBQ2xCLE1BQU07Ozs7dUJBQ1EsU0FBUzs7QUFMeEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7O0FBT3ZDLFNBQVMsR0FBRyxHQUFZO01BQVgsSUFBSSxnQ0FBRyxFQUFFOztBQUNsQixNQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FDckMsMkNBQTJDLEVBQzNDLEdBQUcsQ0FDSixDQUFBOztBQUVELE1BQUksQ0FBQyxHQUFHLDZCQUFXLENBQUM7QUFDbEIsU0FBSyxFQUFFLE9BQU87QUFDZCxXQUFPLEVBQUU7QUFDUCxhQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDakIsbUJBQWEsRUFBRSxJQUFJO0tBQ3BCO0FBQ0QsUUFBSSxFQUFFO0FBQ0osYUFBTyxFQUFFLGlCQUFpQjtBQUFBLEtBQzNCO0dBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7V0FBSSxJQUFJLEdBQUcsWUFBWTtHQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUVuRSxNQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNuRCxLQUFDLEdBQUcsNkJBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtHQUNyRDs7QUFFRCxTQUFPLENBQUMsQ0FBQTtDQUNUOztxQkFHWSxVQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDcEMsTUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLE1BQUksSUFBSSxHQUFHLGFBN0JBLFdBQVcsRUE2QkMsTUFBTSxDQUFDLENBQUE7O0FBRTlCLE1BQUksU0EvQkUsR0FBRyxDQStCRCxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7QUFFeEUsTUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsOEJBQThCLEVBQUUsWUFBTTtBQUMxRCxXQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFDMUMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0dBQ3RELENBQUMsQ0FBQTs7QUFFRixNQUFJLFNBdENFLEdBQUcsQ0FzQ0QsT0FBTyxFQUFFO0FBQ2YsUUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFNBdkNWLEdBQUcsQ0F1Q1csT0FBTyxDQUFDLElBQUksRUFBRTs7QUFDOUIsWUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRWpELFlBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNmLGNBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUU7bUJBQzlDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztXQUFBLENBQ3pDLENBQUE7U0FDRjs7S0FDRjs7QUFFRCxRQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUM3QixVQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7ZUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQUEsQ0FDcEMsQ0FBQTtLQUNGO0dBQ0Y7O0FBRUQsTUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsbUJBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFM0QsTUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRW5FLFNBQU8sSUFBSSxDQUFBO0NBQ1oiLCJmaWxlIjoiaW5kZXguZXM1Iiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge3BrZywgZ3VscEhlbHBpZnl9IGZyb20gJ3N0YW1pbmEnXG5cbmZ1bmN0aW9uIGRlZihvcHRzID0ge30pIHtcbiAgICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICAgJy4nXG4gICAgXVxuXG4gICAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgICBidWlsZDogJ2J1aWxkJyxcbiAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgZXhjbHVkZTogWyd0ZXN0J10sIC8vIGJlY2F1c2UgZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICB0ZXN0OiB7IC8vIE5PVEU6IHRlc3QgaXMgYWx3YXlzIGVuYWJsZWQgYmVjYXVzZSBvZiB0aGlzIGRlZmF1bHQgLS0gbm90IHNvIGdvb2QuLi5cbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZ3VscEluLCBvcHRzKSB7XG4gIGxldCBvID0gZGVmKG9wdHMpXG4gIGxldCBndWxwID0gZ3VscEhlbHBpZnkoZ3VscEluKVxuXG4gIGlmIChwa2cuc2NyaXB0cyAmJiBvLnNjcmlwdHMpIHJlcXVpcmUoJ2d1bHAtbnBtLXJ1bicpKGd1bHBJbiwgby5zY3JpcHRzKVxuXG4gIGd1bHAudGFzaygnYmV2ZXJhZ2UnLCAnVGhlIHJlY2lwZSBvZiB0aGlzIGJldmVyYWdlLicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnXFxuQ3VycmVudCBiZXZlcmFnZSBvcHRpb25zOicpXG4gICAgY29uc29sZS5sb2coJ1xcbicgKyBKU09OLnN0cmluZ2lmeShvLCBudWxsLCAyKSArICdcXG4nKVxuICB9KVxuXG4gIGlmIChwa2cuc2NyaXB0cykge1xuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgbGV0IHRlc3QgPSByZXF1aXJlKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuXG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgZ3VscC50YXNrKCd0ZXN0OndhdGNoJywgby50ZXN0V2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgICByZXF1aXJlKCdndWxwLXdhdGNoJykoby50ZXN0V2F0Y2gsIHRlc3QpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgZ3VscC50YXNrKG8uYnVpbGQgKyAnOndhdGNoJywgby5idWlsZFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBbby5idWlsZF0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxdWlyZSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHJlcXVpcmUoJ2hhbC1yYycpKG8sIGd1bHApXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==