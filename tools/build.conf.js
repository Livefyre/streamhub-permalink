({
  mainConfigFile: '../requirejs.conf.js',
  paths: {
    almond: 'lib/almond/almond'
  },
  baseUrl: '..',
  name: "streamhub-permalink",
  include: [
    'almond',
    'streamhub-permalink/default-permalink-content-renderer'
  ],
  stubModules: ['text', 'hgn', 'json'],
  out: "../dist/streamhub-permalink.min.js",
  buildCSS: true,
  separateCSS: true,
  pragmasOnSave: {
    excludeHogan: true
  },
  cjsTranslate: true,
  optimize: "uglify2",
  preserveLicenseComments: false,
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  },
  generateSourceMaps: true,
  wrap: {
    startFile: 'wrap-start.frag',
    endFile: 'wrap-end.frag'
  },
  onBuildRead: function(moduleName, path, contents) {
    switch (moduleName) {
      case "jquery":
      // case "base64":
        contents = "define([], function(require, exports, module) {" + contents + "});";
    }
    return contents;
  }
})
