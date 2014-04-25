'use strict'

var Button = require('streamhub-sdk/ui/button');
var inherits = require('inherits');
var ShareCommand = require('streamhub-permalink/share-command');

var ShareButton = function (content, opts) {
    opts = opts || {};
    var cmd = opts.command;
    if (!cmd) {
        cmd = this._command = new ShareCommand(opts);
    }

    Button.call(this, cmd, opts);
}
inherits(ShareButton, Button);

ShareButton.prototype.setContent = function (content) {
    if (!this._command) {
        return;
    }
    this._command.setContent(content);
};

module.exports = ShareButton;
