'use strict'

var $ = require('jquery');
var BaseController = require('annotations/controller/base');
var CommentEvents = require('annotations/events').comment;
var inherits = require('inherits');
var SocialUtil = require('annotations/util/social');
var WriteEvents = require('annotations/events').write;

function ShareController(opts) {
    BaseController.call(this, opts);
}
inherits(ShareController, BaseController);

var COLLECTION_FN_MAP = (function () {
    var events = {};
    events[CommentEvents.GET_PERMALINK] = 'getPermalink';
    return events;
})();

/** @const {number} */
var SHARE_POPUP_HEIGHT = 420;

/** @const {number} */
var SHARE_POPUP_WIDTH = 550;

/** @enum {string} */
var SHARE_URLS = {
    facebook: 'https://www.facebook.com/dialog/feed',
    twitter: 'https://twitter.com/intent/tweet'
};

ShareController.prototype.events = (function() {
    var events = {};
    events[CommentEvents.GET_PERMALINK] = '_handleEvent';
    events[WriteEvents.POST_SHARE] = '_handleShare';
    return events;
})();

/**
 * Handles the standard events that don't require additional processing.
 * @param {jQuery.Event} ev
 * @param {Object} opts
 * @private
 */
ShareController.prototype._handleEvent = function(ev, opts) {
    var event = ev.type + '.' + ev.namespace;
    var fn = COLLECTION_FN_MAP[event];
    var self = this;
    var successEvent = SUCCESS_EVENT_MAP[event];

    this._collection[fn].call(this._collection, opts, function (err, data) {
        (opts.callback || function () {}) (err, data);
        self.$antenna.trigger(CommentEvents.ACTION_SUCCESS, {event: ev});
        successEvent && self.$antenna.trigger(successEvent, opts);
    });
};

/**
 * Handle the share event.
 * @param {jQuery.Event} ev
 * @param {Object} opts
 * @private
 */
ShareController.prototype._handleShare = function(ev, opts) {
    var baseUrl = SHARE_URLS[opts.value];
    var specs = [
        'height=',
        SHARE_POPUP_HEIGHT,
        ',width=',
        SHARE_POPUP_WIDTH
    ].join('');

    // Support the case where this event bubbles from someone clicking share on
    // a comment or from the selected text popover.
    var content = opts.model || {
        author: {displayName: this._config.twitterHandle || ''},
        body: opts.body || this._collection.selectedText || '',
        permalink: window.location.href
    };
    var shareObj = SocialUtil.contentToShare(content, opts.value);
    shareObj.assetServer = this._config.assetServer;
    shareObj.provider = opts.value;
    var params = SocialUtil.generateParams(shareObj);
    window.open(baseUrl + params, 'intent', specs);
    this.$antenna.trigger(WriteEvents.COMMENT_SHARED, $.extend({}, content, shareObj));
};

module.exports = ShareController;
