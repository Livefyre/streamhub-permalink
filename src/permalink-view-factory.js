'use strict'

var AttachmentGalleryModal = require('streamhub-sdk/modal/views/attachment-gallery-modal');
var ContentViewFactory = require('streamhub-sdk/content/content-view-factory');
var GalleryAttachmentListView = require('streamhub-sdk/content/views/gallery-attachment-list-view');
var get = require('mout/object/get');
var MediaMask = require('streamhub-sdk/content/views/media-mask');
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

    /**
     * Overriding the createContentView function of the ContentViewFactory so
     * that we can hijack the render and events since this is a special use
     * case.
     */
    viewFactory.createContentView = function(content, opts) {
        opts.spectrum = true;

        //Get the content...
        var contentView = superMethod.apply(viewFactory, arguments);
        var oldContentViewRender = contentView.render;

        /**
         * Overriding the Content View render method. Adding the DNT Media Mask
         * functionality to it.
         * @override
         */
        contentView.render = function () {
            oldContentViewRender.apply(contentView, arguments);

            var oembed = content.attachments[0];

            // If we shouldn't show the mask, stop processing.
            if (!MediaMask.shouldShowMask(oembed, opts.doNotTrack.browser, opts.doNotTrack.whitelist)) {
                // Need to ensure that click event on the attachment view gets
                // triggered if the video is played, then closed, then it needs
                // to play again.
                var attachmentView = get(contentView, '_attachmentsView._childViews.0');
                attachmentView && attachmentView.delegateEvents();
                return;
            }

            contentView._mask && contentView._mask.destroy();
            var mask = contentView._mask = new MediaMask({
                callback: function () {
                    contentView.$el.trigger('focusContent.hub', {content: content});
                },
                delegate: opts.doNotTrack.delegate,
                oembed: oembed
            });
            contentView.$el.find('.content-attachments-tiled').append(mask.render().$el);
        };

        //...update the events list...
        contentView.events = contentView.events.extended({
            'focusContent.hub': function (e, context) {
                var oembedView = new GalleryAttachmentListView(context);
                var oembedModalView = new AttachmentGalleryModal();
                packageAttribute.decorateModal(oembedModalView);
                oembedModalView.show(oembedView);
            }
        });

        //...and return it.
        return contentView;
    };

    return viewFactory;
}

module.exports = permalinkViewFactory;
