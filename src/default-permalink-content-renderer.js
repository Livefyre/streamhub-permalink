'use strict'

var Modal = require('streamhub-sdk/modal');
var permalinkViewFactory = require('streamhub-permalink/permalink-view-factory');

var defaultPermalinkContentHandler = function (content) {
    //Get the view for the content
    var cvf = permalinkViewFactory(),
        contentView = cvf.createContentView(content);

    //Show the contentView in a modal
    var contentModalView = new Modal();
    contentModalView.show(contentView, true);
};

module.exports = defaultPermalinkContentHandler;
