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
    //TODO (joao) Return a {collectionId, contentId} object
    return purl(document.location).param(uriInterpreter.FIELDS.PERMACONTENT);
};

module.exports = uriInterpreter;
