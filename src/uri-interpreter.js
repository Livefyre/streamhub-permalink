'use strict';

var log = require('streamhub-sdk/debug')
        ('streahub-permalink');

/**
 * A utility for parsing parameters in a URI
 */
var uriInterpreter = {};

uriInterpreter.patterns = {
    // environment?:collectionId:contentId
    content: /lf-content=(([^:]+):)?([^:]+):([^$#&]+)/
};

/**
 * Get a permalink object from the current url. Can also pass in a location
 * object for testing.
 * @param {Object=} loc Optional location object.
 * @return {Object} Parsed permalink object.
 */
uriInterpreter.getContentPermalink = function (loc) {
    loc = loc || window.location;
    return this.parse(loc.search) || this.parse(loc.hash);
};

/**
 * Parse a string like `window.location.hash`, and return
 * an object describing the Livefyre permalink, if there is one.
 * @param {string} part Query string or hash to be parsed.
 * @return {Object} Parsed permalink object.
 */
uriInterpreter.parse = function (part) {
    if (!part) {
        return;
    }
    
    var contentPatternMatch = part.match(this.patterns.content);
    if (!contentPatternMatch) {
        return;
    }

    var environment = contentPatternMatch[2];
    var collectionId = contentPatternMatch[3];
    var contentId = contentPatternMatch[4];

    var network = 'livefyre.com';
    var matches = contentId.match(/@([^.]*\.fyre\.co)/);
    if (matches) {
        network = matches[1];
    }

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
