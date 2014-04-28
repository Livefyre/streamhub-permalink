'use strict'

var AttachmentGalleryModal = require('streamhub-sdk/modal/views/attachment-gallery-modal');
var ContentViewFactory = require('streamhub-sdk/content/content-view-factory');
var GalleryAttachmentListView = require('streamhub-sdk/content/views/gallery-attachment-list-view');

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

        //...update the events list...
        contentView.events = contentView.events.extended({
            'focusContent.hub': function (e, context) {
                var oembedView = new GalleryAttachmentListView(context);
                var oembedModalView = new AttachmentGalleryModal();

                oembedModalView.show(oembedView);
            }
        });

        //...and return it.
        return contentView;
    };

    return viewFactory;
}

module.exports = permalinkViewFactory;
