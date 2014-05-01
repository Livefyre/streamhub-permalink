'use strict'

var BaseMenu = require('annotations/thread/ui/menu/base');
var inherits = require('inherits');
var loader = require('livefyre-bootstrap/loader');
var Share = require('annotations/thread/ui/menu/share');

/**
 * Flag menu.
 * @constructor
 * @extends {BaseMenu}
 * @param {Object} opts Config options.
 */
function ShareMenu(opts) {
    Share.call(this, opts);

    this.topNavEnabled = false;
}
inherits(ShareMenu, Share);

ShareMenu.prototype.events = BaseMenu.prototype.events;

ShareMenu.prototype.render = function () {
    Share.prototype.render.call(this);
    loader.decorate($('.lf-loader-container')[0], 162);
};

ShareMenu.prototype._renderContent = function () {
    Share.prototype._renderContent.call(this);
    // var frag = document.createDocumentFragment()
    // frag.innerHTML = [
    //     '<'
    // ].join('');

    var link = document.createElement('a');
    link.setAttribute('href', this._model.permalink);
    link.setAttribute('class', 'lf-share-link');
    link.innerText = 'Permalink';
    this.$el.find('.lf-menu-foot').html('').append(link);

    var arrow = document.createElement('div');
    arrow.setAttribute('class', 'lf-arrow');
    this.$el.prepend(arrow);

    this.delegateEvents();
};

module.exports = ShareMenu;
