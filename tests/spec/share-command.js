'use strict'

var Command = require('streamhub-sdk/ui/command');
var Content = require('streamhub-sdk/content');
var ShareCommand = require('streamhub-permalink/share-command');
var Popover = require('annotations/ui/popover');
var ShareMenu = require('streamhub-permalink/share-menu');

describe('streamhub-permalink/share-command', function () {
    var cmd;
    it('is a constructor that extends Command', function () {
        expect(typeof(ShareCommand)).toBe('function');

        cmd = new ShareCommand();
        expect(cmd instanceof Command).toBe(true);
    });

    describe('when constructed', function () {
        var content,
            origResize;
        beforeEach(function () {
            cmd = new ShareCommand();
            content = new Content('body');

            origFn = Popover.prototype.resizeAndReposition;
            popoverSpy = jasmine.createSpy('popover resize and reposition');
            Popover.prototype.resizeAndReposition = popoverSpy;
        });
        afterEach(function () {
            Popover.prototype.resizeAndReposition = origFn;
        })

        it('can setContent()', function () {
            cmd.setContent(content);

            expect(cmd._content).toBe(content);
        });

        it('canExecute() only when enabled and ._content is truthy.', function () {
            expect(cmd.canExecute()).toBe(false);

            cmd.setContent(content);
            expect(cmd.canExecute()).toBe(true);

            cmd.disable();
            expect(cmd.canExecute()).toBe(false);
        });

        it('execute()s to show a share menu in a popover', function () {
            cmd.setContent(content);
            cmd.execute();

            expect(popoverSpy).toHaveBeenCalled();
        });

        describe('with opts', function () {
            var opts;
            beforeEach(function () {
                opts = {
                    content: content
                };
                cmd = new ShareCommand(opts);
            });

            it('will setContent() to opts.content', function () {
                expect(cmd._content).toBe(content);
            });
        });
    });
});
