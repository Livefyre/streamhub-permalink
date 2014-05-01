'use strict'

var $ = require('jquery');
var BaseController = require('annotations/controller/base');
var CommentEvents = require('annotations/events').comment;
var MockCollection = require('streamhub-sdk-tests/mocks/collection/mock-collection');
var ShareController = require('streamhub-permalink/share-controller');
var WriteEvents = require('annotations/events').write;

describe('streamhub-permalink/share-controller', function () {
    it('is a constructor that extends BaseController', function () {
        expect(typeof(ShareController)).toBe('function');

        var ctlr = new ShareController();
        expect(ctlr instanceof BaseController).toBe(true);
    });

    describe('constructed with opts', function () {
        var ctlr,
            opts;
        beforeEach(function () {
            opts = {
                app: {emit: sinon.stub()},
                antenna: $('<div />'),
                collection: new MockCollection({}),
                config: {assetServer: ''}
            };
            ctlr = new ShareController(opts);
        });

        it('listens on opts.antenna for "CommentEvents.GET_PERMALINK"', function () {
            spyOn(ctlr, '_handleEvent');

            opts.antenna.trigger(CommentEvents.GET_PERMALINK);

            expect(ctlr._handleEvent).toHaveBeenCalled();
        });

        it('listens on opts.antenna for "WriteEvents.POST_SHARE"', function () {
            spyOn(ctlr, '_handleShare');

            opts.antenna.trigger(writeEvents.POST_SHARE);

            expect(ctlr._handleShare).toHaveBeenCalled();
        });

        it('can _handleEvent()s, such as grabbing a permalink', function () {
            spyOn(ctlr._collection, 'getPermalink');

            ctlr._handleEvent();

            expect(ctlr._collection.getPermalink).toHaveBeenCalled();
        });

        it('can _handleShare()s by opening a window', function () {
            spyOn(window, 'open');

            ctlr._handleShare();

            expect(window.open).toHaveBeenCalled();
        });
    });
});
