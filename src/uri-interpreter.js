'use strict';

var log = require('streamhub-sdk/debug')
        ('streahub-permalink');

/**
 * A utility for parsing parameters in a URI
 */
var uriInterpreter = {};

uriInterpreter.patterns = {
    // environment?:collectionId:contentId
    content: /lf-content=(([^:]+):)?([^:]+):([^$#]+)/
};

uriInterpreter.getContentPermalink = function () {
    return this.parse(window.location.hash);
};

/**
 * Parse a string like `window.location.hash`, and return
 * an object describing the Livefyre permalink, if there is one.
 */
uriInterpreter.parse = function (hash) {
    if ( ! hash) {
        return;
    }
    
    var contentPatternMatch = hash.match(this.patterns.content);
    if ( ! contentPatternMatch) {
        return;
    }

    var environment = contentPatternMatch[2];
    var collectionId = contentPatternMatch[3];
    var contentId = contentPatternMatch[4];
    var network = contentId.split('@');
    network = network.length > 1 ? network[1] : 'livefyre.com';

    var parsed = {
        collectionId: collectionId,
        contentId: contentId,
        network: network
    };
    // not specified in prod
    if (environment) {
        parsed.environment = environment;
    }
    return parsed;
}

module.exports = uriInterpreter;
