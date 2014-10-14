'use strict'

var Modal = require('streamhub-sdk/modal');
var permalinkViewFactory = require('streamhub-permalink/permalink-view-factory');
var styles = require('css!./css/styles.css');
var sdkStyles = require('css!streamhub-sdk/css/style.css');
var packageAttribute = require('./package-attribute');

var defaultPermalinkContentHandler = function (content) {
    //Get the view for the content
    var cvf = permalinkViewFactory(),
        contentView = cvf.createContentView(content);

    //Show the contentView in a modal
    var contentModalView = new Modal();

    packageAttribute.decorateModal(contentModalView);
    contentModalView.show(contentView, true);

    //clears the 'x' that is by default present in the button
    //and conflicts with the fycon used in the permalink styling
    contentModalView.$el.find('.hub-modal-close').text('');
    this.modalView = contentModalView;
};

module.exports = defaultPermalinkContentHandler;
