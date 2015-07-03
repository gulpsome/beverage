'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _stamina = require('stamina');

require('source-map-support').install();

function req(name) {
  var dep = _ramda2['default'].has(name);
  var local = dep(_stamina.pkg.dependencies) || dep(_stamina.pkg.devDependencies);
  if (local) {
    var where = _path2['default'].normalize(process.cwd() + '/node_modules/' + name);
    return require(_path2['default'].join(where, require(_path2['default'].join(where, 'package.json')).main));
  } else {
    console.warn('Package ' + name + ' not found as local dependency, fallback to beverage.');
    return require(name);
  }
}

function def() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = _sourcegate2['default']([{
    build: 'build',
    scripts: {
      exclude: ['test'], // because gulp-npm-test does testing better than gulp-npm-run
      requireStrict: true
    },
    test: {
      testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.scripts.include && o.scripts.include[o.build]) {
    o = _sourcegate2['default']([o, { scripts: { require: [o.build] } }]);
  }

  return o;
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = _stamina.gulpHelpify(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_stamina.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _stamina.pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        console.warn('Option testWatch is deprecated, please use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      req('gulp-npm-test')(gulp, o.test);
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      console.warn('The build & buildWatch options are deprecated...');
      console.warn('Please use "causality" instead.\n');
      gulp.task(o.build + ':watch', o.buildWatch.toString(), function () {
        return gulp.watch(o.buildWatch, [o.build]);
      });
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {};
    // TODO: the rest of this as far as the req is temporary, for graceful upgrade...
    // delete afterwards
    var convert = { 'sourcegateModule': 'module',
      'sourcegatePrefix': 'prefix',
      'sourcegatePreset': 'preset',
      'sourcegateWatch': 'watch' };
    if (_ramda2['default'].keys(_ramda2['default'].pick(_ramda2['default'].keys(convert), o)).length) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _ramda2['default'].keys(convert)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (o[key]) {
            var val = convert[key];
            o.sourceopt[val] = o[key];
            console.warn('Deprecated ' + key + ' option, please use sourceopt.' + val + ' instead.');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    req('hal-rc')(_ramda2['default'].pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxQkFFYyxPQUFPOzs7O29CQUNKLE1BQU07Ozs7MEJBQ0EsWUFBWTs7Ozt1QkFDSixTQUFTOztBQUx4QyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7QUFPdkMsU0FBUyxHQUFHLENBQUUsSUFBSSxFQUFFO0FBQ2xCLE1BQUksR0FBRyxHQUFHLG1CQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNyQixNQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsU0FKVixHQUFHLENBSVcsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLFNBSm5DLEdBQUcsQ0FJb0MsZUFBZSxDQUFDLENBQUE7QUFDN0QsTUFBSSxLQUFLLEVBQUU7QUFDVCxRQUFJLEtBQUssR0FBRyxrQkFBSyxTQUFTLENBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxzQkFBaUIsSUFBSSxDQUFHLENBQUE7QUFDbkUsV0FBTyxPQUFPLENBQUMsa0JBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsa0JBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7R0FDakYsTUFBTTtBQUNMLFdBQU8sQ0FBQyxJQUFJLGNBQVksSUFBSSwyREFBd0QsQ0FBQTtBQUNwRixXQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNyQjtDQUNGOztBQUVELFNBQVMsR0FBRyxHQUFhO01BQVgsSUFBSSxnQ0FBRyxFQUFFOztBQUNuQixNQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FDckMsMkNBQTJDLEVBQzNDLEdBQUcsQ0FDSixDQUFBOztBQUVELE1BQUksQ0FBQyxHQUFHLHdCQUFXLENBQUM7QUFDbEIsU0FBSyxFQUFFLE9BQU87QUFDZCxXQUFPLEVBQUU7QUFDUCxhQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDakIsbUJBQWEsRUFBRSxJQUFJO0tBQ3BCO0FBQ0QsUUFBSSxFQUFFO0FBQ0osYUFBTyxFQUFFLGlCQUFpQjtBQUFBLEtBQzNCO0dBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7V0FBSSxJQUFJLEdBQUcsWUFBWTtHQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUVuRSxNQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNuRCxLQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtHQUNyRDs7QUFFRCxTQUFPLENBQUMsQ0FBQTtDQUNUOztxQkFFWSxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDckMsTUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLE1BQUksSUFBSSxHQUFHLFNBeENBLFdBQVcsQ0F3Q0MsTUFBTSxDQUFDLENBQUE7O0FBRTlCLE1BQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLDhCQUE4QixFQUFFLFlBQU07QUFDMUQsV0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFDLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtHQUN0RCxDQUFDLENBQUE7O0FBRUYsTUFBSSxTQS9DRSxHQUFHLENBK0NELE9BQU8sRUFBRTtBQUNmLFFBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7QUFFbkQsUUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFNBbERWLEdBQUcsQ0FrRFcsT0FBTyxDQUFDLElBQUksRUFBRTtBQUM5QixVQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7O0FBRWYsZUFBTyxDQUFDLElBQUksQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO0FBQzlFLFNBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7T0FDM0I7QUFDRCxTQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNuQzs7QUFFRCxRQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTs7QUFFN0IsYUFBTyxDQUFDLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0FBQ2hFLGFBQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtBQUNqRCxVQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7ZUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQUEsQ0FDcEMsQ0FBQTtLQUNGO0dBQ0Y7O0FBRUQsTUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLEtBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUE7OztBQUcvQixRQUFJLE9BQU8sR0FBRyxFQUFDLGtCQUFrQixFQUFFLFFBQVE7QUFDNUIsd0JBQWtCLEVBQUUsUUFBUTtBQUM1Qix3QkFBa0IsRUFBRSxRQUFRO0FBQzVCLHVCQUFpQixFQUFFLE9BQU8sRUFBQyxDQUFBO0FBQzFDLFFBQUksbUJBQUUsSUFBSSxDQUFDLG1CQUFFLElBQUksQ0FBQyxtQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Ozs7OztBQUM3Qyw2QkFBZ0IsbUJBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4SEFBRTtjQUF4QixHQUFHOztBQUNWLGNBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ1YsZ0JBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QixhQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QixtQkFBTyxDQUFDLElBQUksaUJBQWUsR0FBRyxzQ0FBaUMsR0FBRyxlQUFZLENBQUE7V0FDL0U7U0FDRjs7Ozs7Ozs7Ozs7Ozs7O0tBQ0Y7QUFDRCxPQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQUUsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0dBQzVEOztBQUVELE1BQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXZELE1BQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cGtnLCBndWxwSGVscGlmeX0gZnJvbSAnc3RhbWluYSdcblxuZnVuY3Rpb24gcmVxIChuYW1lKSB7XG4gIGxldCBkZXAgPSBSLmhhcyhuYW1lKVxuICBsZXQgbG9jYWwgPSBkZXAocGtnLmRlcGVuZGVuY2llcykgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMpXG4gIGlmIChsb2NhbCkge1xuICAgIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9L25vZGVfbW9kdWxlcy8ke25hbWV9YClcbiAgICByZXR1cm4gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4pKVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihgUGFja2FnZSAke25hbWV9IG5vdCBmb3VuZCBhcyBsb2NhbCBkZXBlbmRlbmN5LCBmYWxsYmFjayB0byBiZXZlcmFnZS5gKVxuICAgIHJldHVybiByZXF1aXJlKG5hbWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICAgJy4nXG4gICAgXVxuXG4gICAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgICBidWlsZDogJ2J1aWxkJyxcbiAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgZXhjbHVkZTogWyd0ZXN0J10sIC8vIGJlY2F1c2UgZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6IC9cXC5zcGVjXFwuY29mZmVlJC8gLy8gVE9ETzogbW92ZSB0byAuYmV2ZXJhZ2UgYWZ0ZXIgY2hhbmdpbmcgaXQgdG8gYSBnbG9iXG4gICAgICB9XG4gICAgfV0uY29uY2F0KG9wdHMuZG90QmV2ZXJhZ2UubWFwKGZpbGUgPT4gZmlsZSArICcvLmJldmVyYWdlJyksIG9wdHMpKVxuXG4gICAgaWYgKG8uc2NyaXB0cy5pbmNsdWRlICYmIG8uc2NyaXB0cy5pbmNsdWRlW28uYnVpbGRdKSB7XG4gICAgICBvID0gc291cmNlZ2F0ZShbbywge3NjcmlwdHM6IHtyZXF1aXJlOiBbby5idWlsZF19fV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG9cbiAgfVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZ3VscEluLCBvcHRzKSB7XG4gIGxldCBvID0gZGVmKG9wdHMpXG4gIGxldCBndWxwID0gZ3VscEhlbHBpZnkoZ3VscEluKVxuXG4gIGd1bHAudGFzaygnYmV2ZXJhZ2UnLCAnVGhlIHJlY2lwZSBvZiB0aGlzIGJldmVyYWdlLicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnXFxuQ3VycmVudCBiZXZlcmFnZSBvcHRpb25zOicpXG4gICAgY29uc29sZS5sb2coJ1xcbicgKyBKU09OLnN0cmluZ2lmeShvLCBudWxsLCAyKSArICdcXG4nKVxuICB9KVxuXG4gIGlmIChwa2cuc2NyaXB0cykge1xuICAgIGlmIChvLnNjcmlwdHMpIHJlcSgnZ3VscC1ucG0tcnVuJykoZ3VscCwgby5zY3JpcHRzKVxuXG4gICAgaWYgKG8udGVzdCAmJiBwa2cuc2NyaXB0cy50ZXN0KSB7XG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZFxuICAgICAgICBjb25zb2xlLndhcm4oJ09wdGlvbiB0ZXN0V2F0Y2ggaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB0ZXN0LndhdGNoIGluc3RlYWQuJylcbiAgICAgICAgby50ZXN0LndhdGNoID0gby50ZXN0V2F0Y2hcbiAgICAgIH1cbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG5cbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZCBhcyBpdCdzIHJlZHVuZGFudFxuICAgICAgY29uc29sZS53YXJuKCdUaGUgYnVpbGQgJiBidWlsZFdhdGNoIG9wdGlvbnMgYXJlIGRlcHJlY2F0ZWQuLi4nKVxuICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIFwiY2F1c2FsaXR5XCIgaW5zdGVhZC5cXG4nKVxuICAgICAgZ3VscC50YXNrKG8uYnVpbGQgKyAnOndhdGNoJywgby5idWlsZFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBbby5idWlsZF0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSB7XG4gICAgby5zb3VyY2VvcHQgPSBvLnNvdXJjZW9wdCB8fCB7fVxuICAgIC8vIFRPRE86IHRoZSByZXN0IG9mIHRoaXMgYXMgZmFyIGFzIHRoZSByZXEgaXMgdGVtcG9yYXJ5LCBmb3IgZ3JhY2VmdWwgdXBncmFkZS4uLlxuICAgIC8vIGRlbGV0ZSBhZnRlcndhcmRzXG4gICAgbGV0IGNvbnZlcnQgPSB7J3NvdXJjZWdhdGVNb2R1bGUnOiAnbW9kdWxlJyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZWZpeCc6ICdwcmVmaXgnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlc2V0JzogJ3ByZXNldCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVXYXRjaCc6ICd3YXRjaCd9XG4gICAgaWYgKFIua2V5cyhSLnBpY2soUi5rZXlzKGNvbnZlcnQpLCBvKSkubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgUi5rZXlzKGNvbnZlcnQpKSB7XG4gICAgICAgIGlmIChvW2tleV0pIHtcbiAgICAgICAgICBsZXQgdmFsID0gY29udmVydFtrZXldXG4gICAgICAgICAgby5zb3VyY2VvcHRbdmFsXSA9IG9ba2V5XVxuICAgICAgICAgIGNvbnNvbGUud2FybihgRGVwcmVjYXRlZCAke2tleX0gb3B0aW9uLCBwbGVhc2UgdXNlIHNvdXJjZW9wdC4ke3ZhbH0gaW5zdGVhZC5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcSgnaGFsLXJjJykoUi5waWNrKFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSwgbyksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19