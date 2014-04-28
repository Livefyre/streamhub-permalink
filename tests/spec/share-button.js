'use strict'

var Button = require('streamhub-sdk/ui/button');
var ShareCommand = require('streamhub-permalink/share-command');
var Content = require('streamhub-sdk/content');
var ShareButton = require('streamhub-permalink/share-button');

describe('streamhub-permalink/share-button', function () {
    var content;
    beforeEach(function () {
        content = new Content('body');
    })

    it('is a constructor that extends Button', function () {
        expect(typeof(ShareButton)).toBe('function');

        var ctlr = new ShareButton();
        expect(ctlr instanceof Button).toBe(true);
    });

    it('can setContent() when using the default command', function () {
        var btn = new ShareButton();
        spyOn(btn._command, 'setContent');

        btn.setContent(content);

        expect(btn._command.setContent).toHaveBeenCalledWith(content);
    });

    describe('when constructed with opts', function () {
        var opts,
            btn;
        beforeEach(function () {
            opts = {
                command: new ShareCommand(function () {}),
                content: content
            };
            btn = new ShareButton(opts);
        });

        it('uses opts.command instead of the default command', function () {
            expect(btn._command).toBe(opts.command);
        });

        it('passes opts.content to the command', function () {
            expect(btn._command._content).toBe(opts.content);
        });
    });
});
