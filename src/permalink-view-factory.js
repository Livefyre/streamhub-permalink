'use strict'

var AttachmentGalleryModal = require('streamhub-sdk/modal/views/attachment-gallery-modal');
var ContentViewFactory = require('streamhub-sdk/content/content-view-factory');
var GalleryAttachmentListView = require('streamhub-sdk/content/views/gallery-attachment-list-view');
var packageAttribute = require('./package-attribute');

/**
 * A decorator that creates or takes an instace of ContentViewFactory and
 * updates .createContentView() to return a View that handles
 * 'focusContent.hub'.
 * @param [opts] {Object}
 * @param [opts.baseFactory] {ContentViewFactory} An instance of
 *          ContentViewFactory or something that subclasses it.
 */
var permalinkViewFactory = function (opts) {
    opts = opts || {};
    var viewFactory = opts.baseFactory || new ContentViewFactory();
    var superMethod = viewFactory.createContentView;
    viewFactory.createContentView = function(content) {
        //Get the content...
        var contentView = superMethod.apply(viewFactory, arguments);

        var oldRender = contentView.render;
        contentView.render = function(){
            oldRender.apply(contentView);

            //apply permalink-specific DOM changes
            contentView.$el.find('.content-attachments-gallery-thumbnails .content-attachment').off('click');
            contentView.$el.addClass('permalink-content');
            contentView.$el.find('.content-footer').append('\
                <div class="hub-modal-content-permalink">\
                    <button class="permalink-button" type="button">View Context</button>\
                </div>\
            ');
        };

        //...and return it.
        return contentView;
    };

    return viewFactory;
}

module.exports = permalinkViewFactory;
