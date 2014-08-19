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


    var closeBtn = contentView.el.parentElement.parentElement.getElementsByClassName('hub-modal-close')[0];
    closeBtn.className += ' permalink-modal-close';
    closeBtn.textContent = 'X';
    contentView.$el.css('max-width', '640px');//Necessary evil, until CSS things are sorted
    contentView.$el.addClass(defaultPermalinkContentHandler.CLASSES.PERMALINK);
    contentView.$el.find('.content-footer').append('\
        <div class="hub-modal-content-permalink">\
            <button class="permalink-button" type="button">View Conversation</button>\
        </div>\
    ');

    this.modalView = contentModalView;
};

defaultPermalinkContentHandler.CLASSES = {
    PERMALINK: 'permalink-content'
};

module.exports = defaultPermalinkContentHandler;
