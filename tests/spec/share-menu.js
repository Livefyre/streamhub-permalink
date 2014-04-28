'use strict'

var Share = require('annotations/thread/ui/menu/share');
var ShareMenu = require('streamhub-permalink/share-menu');

describe('streamhub-permalink/share-menu', function () {
    it('is a constructor that extends the Sidentes ShareMenu', function () {
        expect(typeof(ShareMenu)).toBe('function');

        var ctlr = new ShareMenu();
        expect(ctlr instanceof Share).toBe(true);
    });

    it('can render() its content when a model has or gets a permalink', function () {
        throw 'TODO (joao) Implement this!';
    });

    describe('when rendered', function () {
        it('has a Twitter action', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('has a Facebook action', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('has a link for URL copying', function () {
            throw 'TODO (joao) Implement this!';
        });
    });
});
