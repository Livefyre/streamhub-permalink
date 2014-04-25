'use strict'

var inherits = require('inherits');
var Share = require('annotations/thread/ui/menu/share');

/**
 * Flag menu.
 * @constructor
 * @extends {BaseMenu}
 * @param {Object} opts Config options.
 */
function ShareMenu(opts) {
    Share.call(this, opts);

    /** @override */
    // this.postEvent = WriteEvents.POST_SHARE;
}
inherits(ShareMenu, Share);

module.exports = ShareMenu;
