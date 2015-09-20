'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

require('source-map-support').install();

var logger = require('tracer').console({
  'filters': { 'warn': _chalk2['default'].yellow, 'error': _chalk2['default'].red },
  'format': '<beverage/{{file}}:{{line}}> {{message}}'
});

function req(name) {
  var dep = _ramda2['default'].has(name);
  var local = dep(_beGoods.pkg.dependencies || {}) || dep(_beGoods.pkg.devDependencies || {});
  if (local) {
    var where = _path2['default'].normalize(process.cwd() + '/node_modules/' + name);
    return require(_path2['default'].join(where, require(_path2['default'].join(where, 'package.json')).main));
  } else {
    if (_ramda2['default'].not(_ramda2['default'].contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      console.warn(_chalk2['default'].yellow('Please install ' + name + ' as a devDependency, future beverage will not buldle it.'));
    }
    return require(name);
  }
}

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
  var gulp = _beGoods.gulpHelpify(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
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

//# sourceMappingURL=data:application/json;base64,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RUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7O0FBRXJELFNBQU8sSUFBSSxDQUFBO0NBQ1oiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3BrZywgZ3VscEhlbHBpZnl9IGZyb20gJ2JlLWdvb2RzJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuXG52YXIgbG9nZ2VyID0gcmVxdWlyZSgndHJhY2VyJykuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeyd3YXJuJzogY2hhbGsueWVsbG93LCAnZXJyb3InOiBjaGFsay5yZWR9LFxuICAnZm9ybWF0JzogJzxiZXZlcmFnZS97e2ZpbGV9fTp7e2xpbmV9fT4ge3ttZXNzYWdlfX0nXG59KVxuXG5mdW5jdGlvbiByZXEgKG5hbWUpIHtcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBsb2NhbCA9IGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbiAgaWYgKGxvY2FsKSB7XG4gICAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gKVxuICAgIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbikpXG4gIH0gZWxzZSB7XG4gICAgaWYgKFIubm90KFIuY29udGFpbnMobmFtZSwgWydoYWwtcmMnLCAnZ3VscC1jYXVzZScsICdndWxwLW5wbS1ydW4nXSkpKSB7XG4gICAgICAvLyB0aGUgYWJvdmUgbGlzdCBvZiBleGNlcHRpb25zIGNvbnRhaW5zIG1vZHVsZXMgdGhhdCB3aWxsIHJlbWFpbiBidW5kbGVkIGFzIGJldmVyYWdlIGRlcGVuZGVuY2llc1xuICAgICAgY29uc29sZS53YXJuKGNoYWxrLnllbGxvdyhgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhIGRldkRlcGVuZGVuY3ksIGZ1dHVyZSBiZXZlcmFnZSB3aWxsIG5vdCBidWxkbGUgaXQuYCkpXG4gICAgfVxuICAgIHJldHVybiByZXF1aXJlKG5hbWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICAgJy4nXG4gICAgXVxuXG4gICAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgICBidWlsZDogJ2J1aWxkJyxcbiAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgZXhjbHVkZTogWyd0ZXN0J10sIC8vIGJlY2F1c2UgZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6IC9cXC5zcGVjXFwuY29mZmVlJC8gLy8gVE9ETzogbW92ZSB0byAuYmV2ZXJhZ2UgYWZ0ZXIgY2hhbmdpbmcgaXQgdG8gYSBnbG9iXG4gICAgICB9XG4gICAgfV0uY29uY2F0KG9wdHMuZG90QmV2ZXJhZ2UubWFwKGZpbGUgPT4gZmlsZSArICcvLmJldmVyYWdlJyksIG9wdHMpKVxuXG4gICAgaWYgKG8uc2NyaXB0cy5pbmNsdWRlICYmIG8uc2NyaXB0cy5pbmNsdWRlW28uYnVpbGRdKSB7XG4gICAgICBvID0gc291cmNlZ2F0ZShbbywge3NjcmlwdHM6IHtyZXF1aXJlOiBbby5idWlsZF19fV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG9cbiAgfVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZ3VscEluLCBvcHRzKSB7XG4gIGxldCBvID0gZGVmKG9wdHMpXG4gIGxldCBndWxwID0gZ3VscEhlbHBpZnkoZ3VscEluKVxuXG4gIGd1bHAudGFzaygnYmV2ZXJhZ2UnLCAnVGhlIHJlY2lwZSBvZiB0aGlzIGJldmVyYWdlLicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnXFxuQ3VycmVudCBiZXZlcmFnZSBvcHRpb25zOicpXG4gICAgY29uc29sZS5sb2coJ1xcbicgKyBKU09OLnN0cmluZ2lmeShvLCBudWxsLCAyKSArICdcXG4nKVxuICB9KVxuXG4gIGlmIChwa2cuc2NyaXB0cykge1xuICAgIGlmIChvLnNjcmlwdHMpIHJlcSgnZ3VscC1ucG0tcnVuJykoZ3VscCwgby5zY3JpcHRzKVxuXG4gICAgaWYgKG8udGVzdCAmJiBwa2cuc2NyaXB0cy50ZXN0KSB7XG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZFxuICAgICAgICBsb2dnZXIud2FybignT3B0aW9uIHRlc3RXYXRjaCBpcyBkZXByZWNhdGVkLCB1c2UgdGVzdC53YXRjaCBpbnN0ZWFkLicpXG4gICAgICAgIG8udGVzdC53YXRjaCA9IG8udGVzdFdhdGNoXG4gICAgICB9XG4gICAgICByZXEoJ2d1bHAtbnBtLXRlc3QnKShndWxwLCBvLnRlc3QpXG4gICAgfVxuXG4gICAgaWYgKG8uYnVpbGRXYXRjaCAmJiBvLnNjcmlwdHMpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWQgYXMgaXQncyByZWR1bmRhbnRcbiAgICAgIGxvZ2dlci53YXJuKCdUaGUgYnVpbGQgJiBidWlsZFdhdGNoIG9wdGlvbnMgYXJlIGRlcHJlY2F0ZWQsIHVzZSBjYXVzYWxpdHkgaW5zdGVhZC4nKVxuICAgICAgZ3VscC50YXNrKG8uYnVpbGQgKyAnOndhdGNoJywgby5idWlsZFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBbby5idWlsZF0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSB7XG4gICAgby5zb3VyY2VvcHQgPSBvLnNvdXJjZW9wdCB8fCB7fVxuICAgIC8vIFRPRE86IHRoZSByZXN0IG9mIHRoaXMgYXMgZmFyIGFzIHRoZSByZXEgaXMgdGVtcG9yYXJ5LCBmb3IgZ3JhY2VmdWwgdXBncmFkZS4uLlxuICAgIC8vIGRlbGV0ZSBhZnRlcndhcmRzXG4gICAgbGV0IGNvbnZlcnQgPSB7J3NvdXJjZWdhdGVNb2R1bGUnOiAnbW9kdWxlJyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZWZpeCc6ICdwcmVmaXgnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlc2V0JzogJ3ByZXNldCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVXYXRjaCc6ICd3YXRjaCd9XG4gICAgaWYgKFIua2V5cyhSLnBpY2soUi5rZXlzKGNvbnZlcnQpLCBvKSkubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgUi5rZXlzKGNvbnZlcnQpKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBsZXQgdmFsID0gY29udmVydFtrZXldXG4gICAgICAgICAgby5zb3VyY2VvcHRbdmFsXSA9IG9ba2V5XVxuICAgICAgICAgIGxvZ2dlci53YXJuKGBEZXByZWNhdGVkICR7a2V5fSBvcHRpb24sIHVzZSBzb3VyY2VvcHQuJHt2YWx9IGluc3RlYWQuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXEoJ2hhbC1yYycpKFIucGljayhbJ3NvdXJjZWdhdGUnLCAnc291cmNlb3B0J10sIG8pLCBndWxwKVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxKCdndWxwLWhhcnAnKShndWxwLCBSLnBpY2soWydoYXJwJ10sIG8pKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==