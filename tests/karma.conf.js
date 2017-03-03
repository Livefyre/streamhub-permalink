module.exports = function (config) {
  config.set({
    logLevel: config.LOG_INFO,
    basePath: '..',
    frameworks: ['jasmine', 'cajon'],
    files: [
      {pattern: 'requirejs.conf.js', included: true},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},
      'tests/spec/*.js',
      {pattern: 'tests/spec-list.js', included: false},
      {pattern: 'tests/tests-main.js', included: false}
    ],
    browsers: ['PhantomJS'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: {'spec/*.js': ['coverage']}
  });
};

