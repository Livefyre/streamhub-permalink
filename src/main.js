'use strict';

var Permalink  = require('streamhub-permalink/permalink');
var permalink = new Permalink();

module.exports = {
    getInstance: function () {
        return permalink;
    },
    KEYS: Permalink.KEYS
};
