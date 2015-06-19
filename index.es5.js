'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _stamina = require('stamina');

require('source-map-support').install();

function def() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2['default'])([{
    causality: {},
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

    // TODO: the following should be deleted as it's redundant
    if (o.buildWatch && o.scripts) {
      console.warn('The build & buildWatch options are deprecated...');
      console.warn('Please use "causality" instead.\n');
      gulp.task(o.build + ':watch', o.buildWatch.toString(), function () {
        return gulp.watch(o.buildWatch, [o.build]);
      });
    }
  }

  var _loop = function (task) {
    var cause = o.causality[task];
    // TODO: require the task to already exist?
    gulp.task(task + ':watch', cause.toString(), function () {
      return gulp.watch(o.buildWatch, cause);
    });
  };

  for (var task in o.causality) {
    _loop(task);
  }

  if (o.harp) require('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxQkFFYyxPQUFPOzs7OzBCQUNFLFlBQVk7Ozs7dUJBQ0osU0FBUzs7QUFKeEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7O0FBTXZDLFNBQVMsR0FBRyxHQUFhO01BQVgsSUFBSSxnQ0FBRyxFQUFFOztBQUNuQixNQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FDckMsMkNBQTJDLEVBQzNDLEdBQUcsQ0FDSixDQUFBOztBQUVELE1BQUksQ0FBQyxHQUFHLDZCQUFXLENBQUM7QUFDbEIsYUFBUyxFQUFFLEVBQUU7QUFDYixTQUFLLEVBQUUsT0FBTztBQUNkLFdBQU8sRUFBRTtBQUNQLGFBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNqQixtQkFBYSxFQUFFLElBQUk7S0FDcEI7QUFDRCxRQUFJLEVBQUU7QUFDSixhQUFPLEVBQUUsaUJBQWlCO0FBQUEsS0FDM0I7R0FDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksR0FBRyxZQUFZO0dBQUEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7O0FBRW5FLE1BQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25ELEtBQUMsR0FBRyw2QkFBVyxDQUFDLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0dBQ3JEOztBQUVELFNBQU8sQ0FBQyxDQUFBO0NBQ1Q7O3FCQUVZLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUNyQyxNQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakIsTUFBSSxJQUFJLEdBQUcsYUE3QkEsV0FBVyxFQTZCQyxNQUFNLENBQUMsQ0FBQTs7QUFFOUIsTUFBSSxTQS9CRSxHQUFHLENBK0JELE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUV4RSxNQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxZQUFNO0FBQzFELFdBQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtBQUMxQyxXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7R0FDdEQsQ0FBQyxDQUFBOztBQUVGLE1BQUksU0F0Q0UsR0FBRyxDQXNDRCxPQUFPLEVBQUU7QUFDZixRQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksU0F2Q1YsR0FBRyxDQXVDVyxPQUFPLENBQUMsSUFBSSxFQUFFOztBQUM5QixZQUFJLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFakQsWUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2YsY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTttQkFDOUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1dBQUEsQ0FDekMsQ0FBQTtTQUNGOztLQUNGOzs7QUFHRCxRQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUM3QixhQUFPLENBQUMsSUFBSSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7QUFDaEUsYUFBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ2pELFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtlQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7T0FBQSxDQUNwQyxDQUFBO0tBQ0Y7R0FDRjs7d0JBRVEsSUFBSTtBQUNYLFFBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRTdCLFFBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7YUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztLQUFBLENBQ2hDLENBQUE7OztBQUxILE9BQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtVQUFyQixJQUFJO0dBTVo7O0FBRUQsTUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsbUJBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFM0QsTUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRW5FLFNBQU8sSUFBSSxDQUFBO0NBQ1oiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cGtnLCBndWxwSGVscGlmeX0gZnJvbSAnc3RhbWluYSdcblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICAgJy4nXG4gICAgXVxuXG4gICAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgICBjYXVzYWxpdHk6IHt9LFxuICAgICAgYnVpbGQ6ICdidWlsZCcsXG4gICAgICBzY3JpcHRzOiB7XG4gICAgICAgIGV4Y2x1ZGU6IFsndGVzdCddLCAvLyBiZWNhdXNlIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgdGVzdDogeyAvLyBOT1RFOiB0ZXN0IGlzIGFsd2F5cyBlbmFibGVkIGJlY2F1c2Ugb2YgdGhpcyBkZWZhdWx0IC0tIG5vdCBzbyBnb29kLi4uXG4gICAgICAgIHRlc3RzUmU6IC9cXC5zcGVjXFwuY29mZmVlJC8gLy8gVE9ETzogbW92ZSB0byAuYmV2ZXJhZ2UgYWZ0ZXIgY2hhbmdpbmcgaXQgdG8gYSBnbG9iXG4gICAgICB9XG4gICAgfV0uY29uY2F0KG9wdHMuZG90QmV2ZXJhZ2UubWFwKGZpbGUgPT4gZmlsZSArICcvLmJldmVyYWdlJyksIG9wdHMpKVxuXG4gICAgaWYgKG8uc2NyaXB0cy5pbmNsdWRlICYmIG8uc2NyaXB0cy5pbmNsdWRlW28uYnVpbGRdKSB7XG4gICAgICBvID0gc291cmNlZ2F0ZShbbywge3NjcmlwdHM6IHtyZXF1aXJlOiBbby5idWlsZF19fV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG9cbiAgfVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZ3VscEluLCBvcHRzKSB7XG4gIGxldCBvID0gZGVmKG9wdHMpXG4gIGxldCBndWxwID0gZ3VscEhlbHBpZnkoZ3VscEluKVxuXG4gIGlmIChwa2cuc2NyaXB0cyAmJiBvLnNjcmlwdHMpIHJlcXVpcmUoJ2d1bHAtbnBtLXJ1bicpKGd1bHBJbiwgby5zY3JpcHRzKVxuXG4gIGd1bHAudGFzaygnYmV2ZXJhZ2UnLCAnVGhlIHJlY2lwZSBvZiB0aGlzIGJldmVyYWdlLicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnXFxuQ3VycmVudCBiZXZlcmFnZSBvcHRpb25zOicpXG4gICAgY29uc29sZS5sb2coJ1xcbicgKyBKU09OLnN0cmluZ2lmeShvLCBudWxsLCAyKSArICdcXG4nKVxuICB9KVxuXG4gIGlmIChwa2cuc2NyaXB0cykge1xuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgbGV0IHRlc3QgPSByZXF1aXJlKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuXG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgZ3VscC50YXNrKCd0ZXN0OndhdGNoJywgby50ZXN0V2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgICByZXF1aXJlKCdndWxwLXdhdGNoJykoby50ZXN0V2F0Y2gsIHRlc3QpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiB0aGUgZm9sbG93aW5nIHNob3VsZCBiZSBkZWxldGVkIGFzIGl0J3MgcmVkdW5kYW50XG4gICAgaWYgKG8uYnVpbGRXYXRjaCAmJiBvLnNjcmlwdHMpIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhlIGJ1aWxkICYgYnVpbGRXYXRjaCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLi4uJylcbiAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIHVzZSBcImNhdXNhbGl0eVwiIGluc3RlYWQuXFxuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IHRhc2sgaW4gby5jYXVzYWxpdHkpIHtcbiAgICBsZXQgY2F1c2UgPSBvLmNhdXNhbGl0eVt0YXNrXVxuICAgIC8vIFRPRE86IHJlcXVpcmUgdGhlIHRhc2sgdG8gYWxyZWFkeSBleGlzdD9cbiAgICBndWxwLnRhc2sodGFzayArICc6d2F0Y2gnLCBjYXVzZS50b1N0cmluZygpLCAoKSA9PlxuICAgICAgZ3VscC53YXRjaChvLmJ1aWxkV2F0Y2gsIGNhdXNlKVxuICAgIClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcXVpcmUoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSByZXF1aXJlKCdoYWwtcmMnKShvLCBndWxwKVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=