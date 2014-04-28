'use strict'

var $ = require('jquery');
var BaseController = require('annotations/controller/base');
var MockCollection = require('streamhub-sdk-tests/mocks/collection/mock-collection');
var ShareController = require('streamhub-permalink/share-controller');

describe('streamhub-permalink/share-controller', function () {
    it('is a constructor that extends BaseController', function () {
        expect(typeof(ShareController)).toBe('function');

        var ctlr = new ShareController();
        expect(ctlr instanceof BaseController).toBe(true);
    });

    describe('constructed with opts', function () {
        var actlr,
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
            throw 'TODO (joao) Implement this!';
        });

        it('listens on opts.antenna for "WriteEvents.POST_SHARE"', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('can _handleEvent()s, such as grabbing a permalink', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('can _handleShare()s by opening a window', function () {
            throw 'TODO (joao) Implement this!';
        });
    });
});
