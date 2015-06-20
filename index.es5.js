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

  if (o.harp) require('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp);

  if (_ramda2['default'].keys(o.causality).length) require('gulp-cause')(gulp, o.causality);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ2pELFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtlQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7T0FBQSxDQUNwQyxDQUFBO0tBQ0Y7R0FDRjs7QUFFRCxNQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUUzRCxNQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFFbkUsTUFBSSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFeEUsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IHtwa2csIGd1bHBIZWxwaWZ5fSBmcm9tICdzdGFtaW5hJ1xuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgICAnLidcbiAgICBdXG5cbiAgICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICAgIGNhdXNhbGl0eToge30sXG4gICAgICBidWlsZDogJ2J1aWxkJyxcbiAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgZXhjbHVkZTogWyd0ZXN0J10sIC8vIGJlY2F1c2UgZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICB0ZXN0OiB7IC8vIE5PVEU6IHRlc3QgaXMgYWx3YXlzIGVuYWJsZWQgYmVjYXVzZSBvZiB0aGlzIGRlZmF1bHQgLS0gbm90IHNvIGdvb2QuLi5cbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgaWYgKHBrZy5zY3JpcHRzICYmIG8uc2NyaXB0cykgcmVxdWlyZSgnZ3VscC1ucG0tcnVuJykoZ3VscEluLCBvLnNjcmlwdHMpXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8udGVzdCAmJiBwa2cuc2NyaXB0cy50ZXN0KSB7XG4gICAgICBsZXQgdGVzdCA9IHJlcXVpcmUoJ2d1bHAtbnBtLXRlc3QnKShndWxwLCBvLnRlc3QpXG5cbiAgICAgIGlmIChvLnRlc3RXYXRjaCkge1xuICAgICAgICBndWxwLnRhc2soJ3Rlc3Q6d2F0Y2gnLCBvLnRlc3RXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICAgIHJlcXVpcmUoJ2d1bHAtd2F0Y2gnKShvLnRlc3RXYXRjaCwgdGVzdClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IHRoZSBmb2xsb3dpbmcgc2hvdWxkIGJlIGRlbGV0ZWQgYXMgaXQncyByZWR1bmRhbnRcbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgY29uc29sZS53YXJuKCdUaGUgYnVpbGQgJiBidWlsZFdhdGNoIG9wdGlvbnMgYXJlIGRlcHJlY2F0ZWQuLi4nKVxuICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIFwiY2F1c2FsaXR5XCIgaW5zdGVhZC5cXG4nKVxuICAgICAgZ3VscC50YXNrKG8uYnVpbGQgKyAnOndhdGNoJywgby5idWlsZFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBbby5idWlsZF0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgaWYgKG8uaGFycCkgcmVxdWlyZSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHJlcXVpcmUoJ2hhbC1yYycpKG8sIGd1bHApXG5cbiAgaWYgKFIua2V5cyhvLmNhdXNhbGl0eSkubGVuZ3RoKSByZXF1aXJlKCdndWxwLWNhdXNlJykoZ3VscCwgby5jYXVzYWxpdHkpXG5cbiAgcmV0dXJuIGd1bHBcbn1cbiJdfQ==