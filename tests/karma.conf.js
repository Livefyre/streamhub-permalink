module.exports = function(config) {
  config.set({
    logLevel: config.LOG_INFO,
    basePath: '..',
    frameworks: ['jasmine', 'cajon'],
    files: [
      'requirejs.conf.js',
      'lib/streamhub-sdk/tests/lib/function.bind.js',
      { pattern: 'package.json', included: false },
      { pattern: 'src/css/*', included: false },
      { pattern: 'src/**/*.js', included: false },
      { pattern: 'lib/**/*.js', included: false },
      { pattern: 'lib/**/*.mustache', included: false },
      { pattern: 'tests/spec/*.js', included: false },

      { pattern: 'lib/streamhub-sdk/src/css/*', included: false },
      'tests/tests-main.js'
    ],
    browsers: ['PhantomJS'],
    singleRun: true,
    reporters: ['progress', 'coverage']
  });
};

