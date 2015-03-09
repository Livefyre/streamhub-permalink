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
          expect(parsed.environment).toBeUndefined();
          expect(parsed.network).toBe('livefyre.com');
        })
      });

      it('properly parses livefyre permalink hashes for sidenotes Content', function () {
        var hashes = [
          '#lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
          '#blah?who#blah##lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com#NOMG'
        ];
        hashes.forEach(function (hash) {
          var parsed = uriInterpreter.parse(hash);
          expect(parsed.collectionId).toBe('77593265');
          expect(parsed.contentId).toBe('5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com');
          expect(parsed.environment).toBeUndefined();
          expect(parsed.network).toBe('livefyre.com');
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
          expect(parsed.network).toBe('livefyre.com');
        })
      });

      it('uses custom network if present on permalink url', function () {
        var hash = '#lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co'
        var parsed = uriInterpreter.parse(hash);
        expect(parsed.collectionId).toBe('74579420');
        expect(parsed.contentId).toBe('6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co');
        expect(parsed.environment).toBeUndefined();
        expect(parsed.network).toBe('heremedia-int-0.fyre.co');
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
