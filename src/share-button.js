'use strict'

var Button = require('streamhub-sdk/ui/button');
var inherits = require('inherits');
var ShareCommand = require('streamhub-permalink/share-command');

/**
 * 
 * [opts] {Object=}
 * [opts.command] {Command=} Command in place of the default.
 * [opts.content] {Content=} Content to share. Can be set later.
 */
var ShareButton = function (opts) {
    Button.call(this, opts && opts.command || new ShareCommand(opts), opts);
}
inherits(ShareButton, Button);

ShareButton.prototype.setContent = function (content) {
    this._command.setContent && this._command.setContent(content);
};

module.exports = ShareButton;
