'use strict'

var Command = require('streamhub-sdk/ui/command');
var inherits = require('inherits');
var Popover = require('annotations/ui/popover');
var ShareMenu = require('streamhub-permalink/share-menu');

var ShareCommand = function(opts) {
    opts = opts || {};

    Command.call(this, showShare, opts);

    if (opts.content) {
        this.setContent(opts.content);
    }

    var self = this;
    function showShare() {
        //TODO (joao) Not acceptible
        var showing = true;

        var share = new ShareMenu({
            model: self._content
        });

        share.render();
        

        var popover = new Popover();
        popover._position = Popover.POSITIONS.BOTTOM;
        popover.render();
        popover.setContentNode(share.el);
        
        share.initialize();
        popover.resizeAndReposition(document.getElementById('share'));


//TODO (joao) Remove this after adding controller stuff.
        $('html').one('click', hideShare);
        function hideShare(ev) {
            if (showing) {
                showing = false;
                $('html').one('click', hideShare);
                return;
            }
            share.detach();
            share.destroy();
            popover.destroy();
        }
    }
}
inherits(ShareCommand, Command);

ShareCommand.prototype.setContent = function (content) {
    this._content = content;
    this._emitChangeCanExecute();
}

ShareCommand.prototype.canExecute = function () {
    return Command.prototype.canExecute.call(this) && this._content;
};

module.exports = ShareCommand;
