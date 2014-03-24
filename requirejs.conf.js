require.config({
  paths: {
    jquery: 'lib/jquery/jquery',
    text: 'lib/requirejs-text/text',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    json: 'lib/requirejs-plugins/src/json',
    jasmine: 'lib/jasmine/lib/jasmine-core/jasmine',
    'event-emitter': 'lib/event-emitter/src/event-emitter',
    inherits: 'lib/inherits/inherits',
    blanket: 'lib/blanket/dist/qunit/blanket',
    'blanket-jasmine': 'lib/blanket/dist/jasmine/blanket_jasmine',
    uri: 'lib/uri/src/URI.js',
    purl: 'lib/purl/purl.js'
  },
  packages: [{
    name: 'streamhub-permalink',
    location: 'src'
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
    name: 'tests',
    location: 'tests'
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
    }
  }
});
