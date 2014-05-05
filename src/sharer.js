var $ = require('streamhub-sdk/jquery');
var debug = require('streamhub-sdk/debug');
var log = debug('streamhub-sdk/views/list-view');
var Popover = require('streamhub-permalink/ui/popover');
var ShareMenu = require('streamhub-permalink/share-menu');
var SocialUtil = require('streamhub-sdk/social');

var Sharer = function (opts) {
    this.opts = opts;
};

Sharer.prototype.delegate = function (delegate) {
    this._delegate = delegate;
};

Sharer.prototype.hasDelegate = function () {
    return !!this._delegate;
};

Sharer.prototype.canShare = function (contentView) {
    return true;
};

Sharer.prototype.share = function (contentView) {
    if ( ! this._delegate) {
        log('there is no share delegate');
        return;
    }
    if (this.popover) {
        this.hide();
    }
    this._share(contentView);
};

Sharer.prototype._share = function (contentView) {
    var btnEl = contentView.$el.find('.hub-content-share')[0];
    var menu = this.shareMenu = new ShareMenu({
        model: contentView.content
    });

    menu.render();

    var pop = this.popover = new Popover({
        minPopoverInView: 108,
        topSpacing: 108
    });
    pop._position = Popover.POSITIONS.BOTTOM;
    pop.events
    pop.render();
    pop.setContentNode(menu.el);

    menu.initialize();
    pop.resizeAndReposition(btnEl);
    menu.once('write.post_share', $.proxy(this._handleShare, this));

    //Timeout the listener attachment so that it doesn't pick-up the button click
    setTimeout($.proxy(function () {
        $('html').one('click', $.proxy(this.hide, this));
    }, this), 100);
};


Sharer.prototype._handleShare = function(ev) {
    var baseUrl = SHARE_URLS[ev.value];
    var specs = [
        'height=',
        420,
        ',width=',
        550
    ].join('');

    // Support the case where this event bubbles from someone clicking share on
    // a comment or from the selected text popover.
    var content = ev.model;
    var shareObj = SocialUtil.contentToShare(content, ev.value);
    shareObj.assetServer = this.opts.assetServer;
    shareObj.provider = ev.value;
    
    var params = SocialUtil.generateParams(shareObj);
    window.open(baseUrl + params, 'intent', specs);

    this.hide();
};

Sharer.prototype.hide = function (ev) {
    !ev && $('html').off('click', this.hide);

    this.shareMenu.detach();
    this.shareMenu.destroy();
    this.popover.destroy();
    this.popover = this.shareMenu = null;
};

/** @enum {string} */
var SHARE_URLS = {
    facebook: 'https://www.facebook.com/dialog/feed',
    twitter: 'https://twitter.com/intent/tweet'
};

module.exports = Sharer;
