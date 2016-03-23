require.config({
  paths: {
    jquery: 'lib/jquery/jquery',
    text: 'lib/requirejs-text/text',
    base64: 'lib/base64/base64.min',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    json: 'lib/requirejs-plugins/src/json',
    jasmine: 'lib/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': 'lib/jasmine/lib/jasmine-core/jasmine-html',
    'event-emitter': 'lib/event-emitter/src/event-emitter',
    inherits: 'lib/inherits/inherits',
    blanket: 'lib/blanket/dist/qunit/blanket',
    'blanket-jasmine': 'lib/blanket/dist/jasmine/blanket_jasmine',
    purl: 'lib/purl/purl',
    debug: 'lib/debug/debug',
    'livefyre-package-attribute': 'lib/livefyre-package-attribute/src/main',
    rework: 'lib/rework/rework'
  },
  packages: [{
    name: 'auth',
    location: 'lib/auth/src'
  },{
    name: 'templates',
    location: 'src/ui/templates'
  },{
    name: 'eref',
    location: 'lib/eref-js/src'
  },{
    name: 'livefyre-bootstrap',
    location: 'lib/livefyre-bootstrap/src'
  },{
    name: 'stream',
    location: 'lib/stream/src'
  },{
    name: 'streamhub-permalink',
    location: 'src'
  },{
    name: 'streamhub-sdk',
    location: 'lib/streamhub-sdk/src'
  },{
    name: 'streamhub-sdk/auth',
    location: 'lib/streamhub-sdk/src/auth'
  },{
    name: 'streamhub-sdk/ui/',
    location: 'lib/streamhub-sdk/src/ui'
  },{
    name: 'streamhub-sdk/collection',
    location: 'lib/streamhub-sdk/src/collection'
  },{
    name: 'streamhub-sdk/content',
    location: 'lib/streamhub-sdk/src/content'
  },{
    name: 'streamhub-sdk/modal',
    location: 'lib/streamhub-sdk/src/modal'
  },{
    name: 'streamhub-sdk/jquery',
    location: 'lib/streamhub-sdk/src',
    main: 'jquery'
  },{
    name: 'streamhub-sdk-tests',
    location: 'lib/streamhub-sdk/tests'
  },{
    name: 'streamhub-ui',
    location: 'lib/streamhub-ui/src'
  },{
    name: 'streamhub-wall',
    location: 'lib/streamhub-wall/src'
  },{
    name: 'streamhub-share',
    location: 'lib/streamhub-share/src',
    main: 'share-button'
  },{
    name: 'livefyre-bootstrap',
    location: 'lib/livefyre-bootstrap/src'
  },{
    name: 'tests',
    location: 'tests'
  },{
    name: 'view',
    location: 'lib/view/src',
    main: 'view'
  },{
    name: 'css',
    location: 'lib/require-css',
    main: 'css'
  },{
    name: 'less',
    location: 'lib/require-less',
    main: 'less'
  },{
    name: 'mout',
    location: 'lib/mout/src',
    main: 'index'
  }],
  shim: {
    jquery: {
      exports: '$'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'blanket-jasmine': {
      exports: 'blanket',
      deps: ['jasmine']
    },
    'jasmine-jquery': {
      deps: ['jquery']
    },
    rework: {
      exports: 'rework'
    }
  },
  css: {
    clearFileEachBuild: 'dist/streamhub-permalink.min.css',
    transformEach: [{
      requirejs: 'lib/livefyre-package-attribute/tools/prefix-css-requirejs',
      node: 'lib/livefyre-package-attribute/tools/prefix-css-node'
    }]
  },
  less: {
    browserLoad: 'dist/streamhub-permalink.min',
    paths: ['lib'],
    relativeUrls: true,
    modifyVars: {
      '@icon-font-path': '"http://cdn.livefyre.com/libs/livefyre-bootstrap/v1.1.0/fonts/"'
    }
  }
});
