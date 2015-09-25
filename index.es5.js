'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

var logger = _beGoods.console();

function req(name) {
  if (_beGoods.isLocal(name)) {
    return _beGoods.myRequire(name);
  } else {
    if (_ramda2['default'].not(_ramda2['default'].contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      logger.warn('Please install ' + name + ' as a devDependency, future beverage will not buldle it.');
    }
    return require(name);
  }
}

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = _sourcegate2['default']([{
    build: 'build', // TODO: remove this after the deprecations are phased out
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

  return o;
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = _beGoods.gulpHelpify(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    _beGoods.console.log('\nCurrent beverage options:');
    _beGoods.console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_beGoods.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _beGoods.pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        logger.warn('Option testWatch is deprecated, use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      req('gulp-npm-test')(gulp, o.test);
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      logger.warn('The build & buildWatch options are deprecated, use causality instead.');
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

          if (o.hasOwnProperty(key)) {
            var val = convert[key];
            o.sourceopt[val] = o[key];
            logger.warn('Deprecated ' + key + ' option, use sourceopt.' + val + ' instead.');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztRQUFPLDZCQUE2Qjs7cUJBRXRCLE9BQU87Ozs7MEJBQ0UsWUFBWTs7Ozt1QkFDeUIsVUFBVTs7QUFDdEUsSUFBSSxNQUFNLEdBQUcsa0JBQVMsQ0FBQTs7QUFFdEIsU0FBUyxHQUFHLENBQUUsSUFBSSxFQUFFO0FBQ2xCLE1BQUksaUJBQVEsSUFBSSxDQUFDLEVBQUU7QUFDakIsV0FBTyxtQkFBVSxJQUFJLENBQUMsQ0FBQTtHQUN2QixNQUFNO0FBQ0wsUUFBSSxtQkFBRSxHQUFHLENBQUMsbUJBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFOztBQUVyRSxZQUFNLENBQUMsSUFBSSxxQkFBbUIsSUFBSSw4REFBMkQsQ0FBQTtLQUM5RjtBQUNELFdBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ3JCO0NBQ0Y7O0FBRUQsU0FBUyxHQUFHLEdBQWE7TUFBWCxJQUFJLHlEQUFHLEVBQUU7O0FBQ3JCLE1BQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUNyQywyQ0FBMkMsRUFDM0MsR0FBRyxDQUNKLENBQUE7O0FBRUQsTUFBSSxDQUFDLEdBQUcsd0JBQVcsQ0FBQztBQUNsQixTQUFLLEVBQUUsT0FBTztBQUNkLFdBQU8sRUFBRTtBQUNQLGFBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNqQixtQkFBYSxFQUFFLElBQUk7S0FDcEI7QUFDRCxRQUFJLEVBQUU7QUFDSixhQUFPLEVBQUUsaUJBQWlCO0tBQzNCO0dBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7V0FBSSxJQUFJLEdBQUcsWUFBWTtHQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUVuRSxTQUFPLENBQUMsQ0FBQTtDQUNUOztxQkFFYyxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDckMsTUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLE1BQUksSUFBSSxHQUFHLHFCQUFZLE1BQU0sQ0FBQyxDQUFBOztBQUU5QixNQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxZQUFNO0FBQzFELHFCQUFRLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFDLHFCQUFRLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0dBQ3RELENBQUMsQ0FBQTs7QUFFRixNQUFJLGFBQUksT0FBTyxFQUFFO0FBQ2YsUUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUVuRCxRQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksYUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzlCLFVBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTs7QUFFZixjQUFNLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxDQUFDLENBQUE7QUFDdEUsU0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtPQUMzQjtBQUNELFNBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ25DOztBQUVELFFBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFOztBQUU3QixZQUFNLENBQUMsSUFBSSxDQUFDLHVFQUF1RSxDQUFDLENBQUE7QUFDcEYsVUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFO2VBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUFBLENBQ3BDLENBQUE7S0FDRjtHQUNGOztBQUVELE1BQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUN2QyxLQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFBOzs7QUFHL0IsUUFBSSxPQUFPLEdBQUcsRUFBQyxrQkFBa0IsRUFBRSxRQUFRO0FBQzVCLHdCQUFrQixFQUFFLFFBQVE7QUFDNUIsd0JBQWtCLEVBQUUsUUFBUTtBQUM1Qix1QkFBaUIsRUFBRSxPQUFPLEVBQUMsQ0FBQTtBQUMxQyxRQUFJLG1CQUFFLElBQUksQ0FBQyxtQkFBRSxJQUFJLENBQUMsbUJBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFOzs7Ozs7QUFDN0MsNkJBQWdCLG1CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsOEhBQUU7Y0FBeEIsR0FBRzs7QUFDVixjQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekIsZ0JBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QixhQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QixrQkFBTSxDQUFDLElBQUksaUJBQWUsR0FBRywrQkFBMEIsR0FBRyxlQUFZLENBQUE7V0FDdkU7U0FDRjs7Ozs7Ozs7Ozs7Ozs7O0tBQ0Y7QUFDRCxPQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQUUsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0dBQzVEOztBQUVELE1BQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXZELE1BQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IHtwa2csIGlzTG9jYWwsIG15UmVxdWlyZSwgZ3VscEhlbHBpZnksIGNvbnNvbGV9IGZyb20gJ2JlLWdvb2RzJ1xubGV0IGxvZ2dlciA9IGNvbnNvbGUoKVxuXG5mdW5jdGlvbiByZXEgKG5hbWUpIHtcbiAgaWYgKGlzTG9jYWwobmFtZSkpIHtcbiAgICByZXR1cm4gbXlSZXF1aXJlKG5hbWUpXG4gIH0gZWxzZSB7XG4gICAgaWYgKFIubm90KFIuY29udGFpbnMobmFtZSwgWydoYWwtcmMnLCAnZ3VscC1jYXVzZScsICdndWxwLW5wbS1ydW4nXSkpKSB7XG4gICAgICAvLyB0aGUgYWJvdmUgbGlzdCBvZiBleGNlcHRpb25zIGNvbnRhaW5zIG1vZHVsZXMgdGhhdCB3aWxsIHJlbWFpbiBidW5kbGVkIGFzIGJldmVyYWdlIGRlcGVuZGVuY2llc1xuICAgICAgbG9nZ2VyLndhcm4oYFBsZWFzZSBpbnN0YWxsICR7bmFtZX0gYXMgYSBkZXZEZXBlbmRlbmN5LCBmdXR1cmUgYmV2ZXJhZ2Ugd2lsbCBub3QgYnVsZGxlIGl0LmApXG4gICAgfVxuICAgIHJldHVybiByZXF1aXJlKG5hbWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgJy4nXG4gIF1cblxuICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICBidWlsZDogJ2J1aWxkJywgLy8gVE9ETzogcmVtb3ZlIHRoaXMgYWZ0ZXIgdGhlIGRlcHJlY2F0aW9ucyBhcmUgcGhhc2VkIG91dFxuICAgIHNjcmlwdHM6IHtcbiAgICAgIGV4Y2x1ZGU6IFsndGVzdCddLCAvLyBiZWNhdXNlIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgIH0sXG4gICAgdGVzdDoge1xuICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICB9XG4gIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICByZXR1cm4gb1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZ3VscEluLCBvcHRzKSB7XG4gIGxldCBvID0gZGVmKG9wdHMpXG4gIGxldCBndWxwID0gZ3VscEhlbHBpZnkoZ3VscEluKVxuXG4gIGd1bHAudGFzaygnYmV2ZXJhZ2UnLCAnVGhlIHJlY2lwZSBvZiB0aGlzIGJldmVyYWdlLicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnXFxuQ3VycmVudCBiZXZlcmFnZSBvcHRpb25zOicpXG4gICAgY29uc29sZS5sb2coJ1xcbicgKyBKU09OLnN0cmluZ2lmeShvLCBudWxsLCAyKSArICdcXG4nKVxuICB9KVxuXG4gIGlmIChwa2cuc2NyaXB0cykge1xuICAgIGlmIChvLnNjcmlwdHMpIHJlcSgnZ3VscC1ucG0tcnVuJykoZ3VscCwgby5zY3JpcHRzKVxuXG4gICAgaWYgKG8udGVzdCAmJiBwa2cuc2NyaXB0cy50ZXN0KSB7XG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZFxuICAgICAgICBsb2dnZXIud2FybignT3B0aW9uIHRlc3RXYXRjaCBpcyBkZXByZWNhdGVkLCB1c2UgdGVzdC53YXRjaCBpbnN0ZWFkLicpXG4gICAgICAgIG8udGVzdC53YXRjaCA9IG8udGVzdFdhdGNoXG4gICAgICB9XG4gICAgICByZXEoJ2d1bHAtbnBtLXRlc3QnKShndWxwLCBvLnRlc3QpXG4gICAgfVxuXG4gICAgaWYgKG8uYnVpbGRXYXRjaCAmJiBvLnNjcmlwdHMpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWQgYXMgaXQncyByZWR1bmRhbnRcbiAgICAgIGxvZ2dlci53YXJuKCdUaGUgYnVpbGQgJiBidWlsZFdhdGNoIG9wdGlvbnMgYXJlIGRlcHJlY2F0ZWQsIHVzZSBjYXVzYWxpdHkgaW5zdGVhZC4nKVxuICAgICAgZ3VscC50YXNrKG8uYnVpbGQgKyAnOndhdGNoJywgby5idWlsZFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBbby5idWlsZF0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSB7XG4gICAgby5zb3VyY2VvcHQgPSBvLnNvdXJjZW9wdCB8fCB7fVxuICAgIC8vIFRPRE86IHRoZSByZXN0IG9mIHRoaXMgYXMgZmFyIGFzIHRoZSByZXEgaXMgdGVtcG9yYXJ5LCBmb3IgZ3JhY2VmdWwgdXBncmFkZS4uLlxuICAgIC8vIGRlbGV0ZSBhZnRlcndhcmRzXG4gICAgbGV0IGNvbnZlcnQgPSB7J3NvdXJjZWdhdGVNb2R1bGUnOiAnbW9kdWxlJyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZWZpeCc6ICdwcmVmaXgnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlc2V0JzogJ3ByZXNldCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVXYXRjaCc6ICd3YXRjaCd9XG4gICAgaWYgKFIua2V5cyhSLnBpY2soUi5rZXlzKGNvbnZlcnQpLCBvKSkubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgUi5rZXlzKGNvbnZlcnQpKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBsZXQgdmFsID0gY29udmVydFtrZXldXG4gICAgICAgICAgby5zb3VyY2VvcHRbdmFsXSA9IG9ba2V5XVxuICAgICAgICAgIGxvZ2dlci53YXJuKGBEZXByZWNhdGVkICR7a2V5fSBvcHRpb24sIHVzZSBzb3VyY2VvcHQuJHt2YWx9IGluc3RlYWQuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXEoJ2hhbC1yYycpKFIucGljayhbJ3NvdXJjZWdhdGUnLCAnc291cmNlb3B0J10sIG8pLCBndWxwKVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxKCdndWxwLWhhcnAnKShndWxwLCBSLnBpY2soWydoYXJwJ10sIG8pKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==