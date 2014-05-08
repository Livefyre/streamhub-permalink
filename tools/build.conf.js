({
  mainConfigFile: '../requirejs.conf.js',
  paths: {
    almond: 'lib/almond/almond'
  },
  baseUrl: '..',
  name: "streamhub-permalink",
  include: [
    'almond',
    'annotations/adapters/auth-delegates',
    'streamhub-sdk/jquery',
    'streamhub-sdk/collection',
    'streamhub-sdk/content',
    'streamhub-sdk/content/views/content-list-view',
    'streamhub-sdk/modal',
    'streamhub-permalink/sharer',
    'streamhub-permalink/default-permalink-content-handler'
  ],
  stubModules: ['text', 'hgn', 'json'],
  out: "../dist/streamhub-permalink.min.js",
  namespace: 'HubPermalink',
  pragmasOnSave: {
    excludeHogan: true
  },
  cjsTranslate: true,
  optimize: "none",
  preserveLicenseComments: false,
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  },
  generateSourceMaps: true,
  onBuildRead: function(moduleName, path, contents) {
    switch (moduleName) {
      case "jquery":
      // case "base64":
        contents = "define([], function(require, exports, module) {" + contents + "});";
    }
    return contents;
  }
})
