'use strict'

var Command = require('streamhub-sdk/ui/command');
var Content = require('streamhub-sdk/content');
var ShareCommand = require('streamhub-permalink/share-command');
var Popover = require('annotations/ui/popover');
var ShareMenu = require('streamhub-permalink/share-menu');

describe('streamhub-permalink/share-command', function () {
    it('is a constructor that extends Command', function () {
        expect(typeof(ShareCommand)).toBe('function');

        var ctlr = new ShareCommand();
        expect(ctlr instanceof Command).toBe(true);
    });

    it('can setContent() to any value', function () {
        throw 'TODO (joao) Implement this!';
    });

    it('canExecute() only when enabled and ._content is truty.', function () {
        throw 'TODO (joao) Implement this!';
    });

    it('execute()s to show a share menu in a popover', function () {
        throw 'TODO (joao) Implement this!';
    });

    describe('when constructed with opts', function () {
        it('will setContent() to opts.content', function () {
            throw 'TODO (joao) Implement this!';
        });
    });
});
