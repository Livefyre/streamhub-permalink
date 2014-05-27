'use strict';

var $ = require('jquery');
var log = require('streamhub-sdk/debug')
        ('streahub-permalink');
var purl = require('purl');
// var uri = require('uri');
var util = require('streamhub-sdk/util');

/**
 * A utility for parsing parameters in a URI
 */
var uriInterpreter = {};

uriInterpreter.FIELDS = {
    PERMACONTENT: "lf-content"
};

uriInterpreter.getContentPermalink = function () {
    var retval,
        value = purl(document.location).fparam(uriInterpreter.FIELDS.PERMACONTENT);
    if (value) {
        retval = {};
        value = value.split(':');
        if (value.length === 3) {
            retval.environment = value.shift();
        }
        retval.collectionId = value[0];
        retval.contentId = value[1];
    }
    return retval;
};

module.exports = uriInterpreter;
