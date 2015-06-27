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
    o = (0, _sourcegate2['default'])([o, { scripts: { require: [o.build] } }]);
  }

  return o;
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = (0, _stamina.gulpHelpify)(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_stamina.pkg.scripts) {
    if (o.scripts) require('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _stamina.pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        console.warn('Option testWatch is deprecated, please use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      require('gulp-npm-test')(gulp, o.test);
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

  if (o.harp) require('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp);

  if (o.causality) require('gulp-cause')(gulp, o.causality);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,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ZUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQUEsQ0FDcEMsQ0FBQTtLQUNGO0dBQ0Y7O0FBRUQsTUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsbUJBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFM0QsTUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRW5FLE1BQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFekQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IHtwa2csIGd1bHBIZWxwaWZ5fSBmcm9tICdzdGFtaW5hJ1xuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgICAnLidcbiAgICBdXG5cbiAgICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICAgIGJ1aWxkOiAnYnVpbGQnLFxuICAgICAgc2NyaXB0czoge1xuICAgICAgICBleGNsdWRlOiBbJ3Rlc3QnXSwgLy8gYmVjYXVzZSBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxdWlyZSgnZ3VscC1ucG0tcnVuJykoZ3VscCwgby5zY3JpcHRzKVxuXG4gICAgaWYgKG8udGVzdCAmJiBwa2cuc2NyaXB0cy50ZXN0KSB7XG4gICAgICBpZiAoby50ZXN0V2F0Y2gpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZFxuICAgICAgICBjb25zb2xlLndhcm4oJ09wdGlvbiB0ZXN0V2F0Y2ggaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB0ZXN0LndhdGNoIGluc3RlYWQuJylcbiAgICAgICAgby50ZXN0LndhdGNoID0gby50ZXN0V2F0Y2hcbiAgICAgIH1cbiAgICAgIHJlcXVpcmUoJ2d1bHAtbnBtLXRlc3QnKShndWxwLCBvLnRlc3QpXG4gICAgfVxuXG4gICAgaWYgKG8uYnVpbGRXYXRjaCAmJiBvLnNjcmlwdHMpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWQgYXMgaXQncyByZWR1bmRhbnRcbiAgICAgIGNvbnNvbGUud2FybignVGhlIGJ1aWxkICYgYnVpbGRXYXRjaCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLi4uJylcbiAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIHVzZSBcImNhdXNhbGl0eVwiIGluc3RlYWQuXFxuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcXVpcmUoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSByZXF1aXJlKCdoYWwtcmMnKShvLCBndWxwKVxuXG4gIGlmIChvLmNhdXNhbGl0eSkgcmVxdWlyZSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=