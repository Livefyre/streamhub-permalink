'use strict';

var uriInterpreter = require('streamhub-permalink/uri-interpreter');

describe('streamhub-permalink/uri-interpreter', function () {
    describe('.getContentPermalink()', function () {
        xit('returns the value for the "lf-content" field', function () {
            //TODO (joao) create iframe with url
            throw 'TODO (joao) Implement this!';
        });

        it('returns undefined when there isn\'t a "lf-content" field', function () {
            expect(uriInterpreter.getContentPermalink()).toBeUndefined();
        });
    });
});