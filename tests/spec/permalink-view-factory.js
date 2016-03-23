'use strict';

var Content = require('streamhub-sdk/content');
var ContentViewFactory = require('streamhub-sdk/content/content-view-factory');
var permalinkViewFactory = require('streamhub-permalink/permalink-view-factory');

describe('streamhub-permalink/permalink-view-factory', function () {
  it('is a function', function () {
    expect(typeof (permalinkViewFactory)).toBe('function');
  });

  it('returns an instance of ContentViewFactory by default', function () {
    var pvf = permalinkViewFactory();
    expect(pvf instanceof ContentViewFactory).toBe(true);
  });

  describe('when called with opts', function () {
    var opts;
    beforeEach(function () {
      opts = {
        baseFactory: new ContentViewFactory()
      };
    });

    it('returns the same ContentViewFactory instance provided as opts.baseFactory', function () {
      var pvf = permalinkViewFactory(opts);
      expect(pvf).toBe(opts.baseFactory);
    });
  });

  describe('returns factories that', function () {
    var factory;
    beforeEach(function () {
      factory = permalinkViewFactory();
    });

    it('adds a "focusContent.hub" event listener to the ContentView', function () {
      var view = factory.createContentView(new Content('body'));
      expect(view.events['focusContent.hub']).toBeTruthy();
    });
  });
});
