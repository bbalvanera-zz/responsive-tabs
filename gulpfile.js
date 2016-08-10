var fs            = require('fs');
var connect       = require('gulp-connect');
var gulp          = require('gulp');
var karma         = require('karma').server;
var concat        = require('gulp-concat');
var jshint        = require('gulp-jshint');
var header        = require('gulp-header');
var rename        = require('gulp-rename');
var es            = require('event-stream');
var del           = require('del');
var uglify        = require('gulp-uglify');
var minifyHtml    = require('gulp-minify-html');
var minifyCSS     = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var gutil         = require('gulp-util');
var plumber       = require('gulp-plumber');
var open          = require('gulp-open');
var less          = require('gulp-less');
var order         = require("gulp-order");
var ts            = require('gulp-typescript');
var tslint        = require('gulp-tslint');
var debug         = require('gulp-debug');

var config = {
  pkg: JSON.parse(fs.readFileSync('./package.json')),
  banner:
  '/*!\n' +
  ' * <%= pkg.name %>\n' +
  ' * <%= pkg.homepage %>\n' +
  ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
  ' * License: <%= pkg.license %>\n' +
  ' */\n\n\n'
};

gulp.task('connect', function () {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(['./demo/*.html', '.src/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./demo/**/*.html'], ['html']);
  gulp.watch(['./**/*.less'], ['styles']);
  gulp.watch(['./src/**/*.js', './demo/**/*.js', './**/*.html'], ['scripts']);
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('scripts', function () {

  function buildTemplates() {
    return gulp.src('src/**/*.html')
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(templateCache({ module: 'bb.responsive-tabs.tpls', root: 'bbrt/', standalone: true }));
  };

  function buildDistJS() {
    var tsProject = ts.createProject('tsconfig.json');
    var ret = tsProject.src()
      .pipe(debug())
      .pipe(tslint({ formatter: 'verbose' }))
      .pipe(tslint.report({ emitError: false }))
      .pipe(ts(tsProject))
      .pipe(debug());
    return ret;
  };

  es.merge(buildDistJS(), buildTemplates())
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(order([
      'responsive-tabs.js',
      'template.js'
    ]))
    .pipe(concat('responsive-tabs.js'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


gulp.task('styles', function () {

  return gulp.src('src/responsive-tabs.less')
    .pipe(less())
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min.css' }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('open', function () {
  gulp.src('./demo/demo.html')
    .pipe(open('', { url: 'http://localhost:8080/demo/demo.html' }));
});

gulp.task('jshint-test', function () {
  return gulp.src('./test/**/*.js').pipe(jshint());
})

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('karma-serve', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('build', ['clean', 'scripts', 'styles']);
gulp.task('serve', ['build', 'connect', 'watch', 'open']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['build', 'jshint-test', 'karma']);
gulp.task('serve-test', ['build', 'watch', 'jshint-test', 'karma-serve']);