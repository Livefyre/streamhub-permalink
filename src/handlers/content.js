'use strict'

var fetchContent = require('streamhub-sdk/content/fetch-content');

/**
 * Handles permalinks for content.
 * @param permalink {!Permalink} Permalink instance to set content on.
 * @param key {!string} Warehouse key for content
 * @param contentInfo {!Object} Data from the uriInterpreter
 * @param contentInfo.collectionId {!string} ID for the content's collection
 * @param contentInfo.contentId {!string} ID for the content
 * @param [contentInfo.environment] {string=} For environments other than production
 */
var contentHandler = function (permalink, key, contentInfo, callback, contentViewFactory) {
    var contentId = contentInfo.contentId,
        collectionId = contentInfo.collectionId,
        environment = contentInfo.environment,
        collection,
        opts;

    opts = {
        contentId: contentId,
        collectionId: collectionId,
        network: 'livefyre.com'
    };
    environment && (opts.environment = environment);

    fetchContent(opts, handler);

    /**
     * Recieves content and sets it and a handler on the Permalink instance.
     * @param [err] {*=}
     * @param [content] {Content=} Content instance
     */
    function handler(err, content) {
        if (err) {
            throw new Error('Error fetching permalink content: ' + err);
            return;
        }

        permalink.set('content-options', opts);
        permalink.default(key, require('streamhub-permalink/default-permalink-content-renderer'), permalink, [{ contentViewFactory: contentViewFactory }]);
        permalink.set(key, content);
        callback();
    }
};

module.exports = contentHandler;
