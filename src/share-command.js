'use strict'

var Command = require('streamhub-sdk/ui/command');
var log = require('streamhub-sdk/debug')('streamhub-permalink/share-command');
var inherits = require('inherits');
var Popover = require('streamhub-permalink/ui/popover');
var ShareMenu = require('streamhub-permalink/share-menu');

var ShareCommand = function(opts) {
    opts = opts || {};

    Command.call(this, preShare, opts);

    if (opts.content) {
        this.setContent(opts.content);
    }
    if (opts.positionEl) {
        this.setPositionElement(opts.positionEl);
    }

    var self = this;
    function preShare() {
        //TODO (joao) Not acceptible
        var showing = true;

        //Get the permalink
        if (self._content.permalink) {
            showShare();
            return;
        }

        self._content.collection.getPermalink(opts, function (err, data) {
            if (err) {
                log(err);
                return
            }
            self._content.permalink = data;
            showShare();
        });

        function showShare() {
            var share = new ShareMenu({
                model: self._content
            });

            share.render();

            var popover = new Popover();
            popover._position = Popover.POSITIONS.BOTTOM;
            popover.events
            popover.render();
            popover.setContentNode(share.el);

            share.initialize();
            popover.resizeAndReposition(this._positionEl);


            //TODO (joao) Remove this after adding controller stuff.
            $('html').one('click', hideShare);
            function hideShare(ev) {
                if (showing) {
                    showing = false;
                    $('html').one('click', hideShare);
                    return;
                }
                postShare();
            }

            function postShare() {
                share.detach();
                share.destroy();
                popover.destroy();
            }
        }
    }
};
inherits(ShareCommand, Command);

ShareCommand.prototype.setContent = function (content) {
    this._content = content;
    this._emitChangeCanExecute();
};

ShareCommand.prototype.setPositionElement = function (el) {
    this._positionEl = el;
};

ShareCommand.prototype.canExecute = function () {
    return (Command.prototype.canExecute.call(this) && this._content) ? true : false;
};

module.exports = ShareCommand;
