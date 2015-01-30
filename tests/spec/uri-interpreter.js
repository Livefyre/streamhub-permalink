'use strict';

var uriInterpreter = require('streamhub-permalink/uri-interpreter');

describe('streamhub-permalink/uri-interpreter', function () {
    describe('.parse', function () {
      it('returns falsy when there isn\'t a "lf-content" field', function () {
        var hashes = ['', '#', '#asdf', 'asdf']
        hashes.forEach(function (hash) {
          expect(uriInterpreter.parse(hash)).toBeFalsy();
        })
      });

      it('properly parses livefyre permalink hashes', function () {
        var hashes = [
          '#lf-content=108098985:259357490',
          '#blah?who#blah#lf-content=108098985:259357490#NOMG'
        ];
        hashes.forEach(function (hash) {
          var parsed = uriInterpreter.parse(hash);
          expect(parsed.collectionId).toBe('108098985');
          expect(parsed.contentId).toBe('259357490');
        })
      });

      it('would properly parse permalink hashes if included an environment segment', function () {
        var hashes = [
          '#lf-content=t402.livefyre.com:108098985:259357490',
          '#blah?who#blah#lf-content=t402.livefyre.com:108098985:259357490#NOMG'
        ];
        hashes.forEach(function (hash) {
          var parsed = uriInterpreter.parse(hash);
          expect(parsed.collectionId).toBe('108098985');
          expect(parsed.contentId).toBe('259357490');
          expect(parsed.environment).toBe('t402.livefyre.com');
        })
      });

    })
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
