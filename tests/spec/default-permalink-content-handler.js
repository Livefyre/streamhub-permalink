'use strict'

var Content = require('streamhub-sdk/content');
var defaultPermalinkContentHandler = require('streamhub-permalink/handlers/content');

describe('default-permalink-content-handler', function () {
    it('is a function', function () {
        expect(typeof(defaultPermalinkContentHandler)).toBe('function');
    });

    xit('renders content in a modal view', function () {
        var content = new Content('body text');
        defaultPermalinkContentHandler(content);
        throw 'TODO (joao) Check view for modal elements!';
        throw 'TODO (joao) Cleanup DOM!';
    })
});
