'use strict';

var uriInterpreter = require('streamhub-permalink/uri-interpreter');

describe('streamhub-permalink/uri-interpreter', function () {
  describe('.parse', function () {
    it('returns falsy when there isn\'t a "lf-content" field', function () {
      var hashes = ['', '#', '#asdf', 'asdf'];
      hashes.forEach(function (hash) {
        expect(uriInterpreter.parse(hash)).toBeFalsy();
      });
    });

    it('properly parses livefyre permalink hashes and query params', function () {
      var hashes = [
        '#lf-content=108098985:259357490',
        '#blah?who#blah#lf-content=108098985:259357490#NOMG',
        '?lf-content=108098985:259357490',
        '?lf-content=108098985:259357490&test=abc',
        '?test=abc&lf-content=108098985:259357490',
        '#lf-content=108098985%3A259357490',
        '#blah?who#blah#lf-content=108098985%3A259357490#NOMG',
        '?lf-content=108098985%3A259357490',
        '?lf-content=108098985%3A259357490&test=abc',
        '?test=abc&lf-content=108098985%3A259357490'
      ];
      hashes.forEach(function (hash) {
        var parsed = uriInterpreter.parse(hash);
        expect(parsed.collectionId).toBe('108098985');
        expect(parsed.contentId).toBe('259357490');
        expect(parsed.environment).toBeUndefined();
        expect(parsed.network).toBe('livefyre.com');
      });
    });

    it('properly parses livefyre permalink hashes for sidenotes Content', function () {
      var hashes = [
        '#lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '#blah?who#blah##lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com#NOMG',
        '?lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '?test=abc&lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '?test=abc&lf-content=77593265:5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com&something=abc',
        '#lf-content=77593265%3A5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '#blah?who#blah##lf-content=77593265%3A5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com#NOMG',
        '?lf-content=77593265%3A5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '?test=abc&lf-content=77593265%3A5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com',
        '?test=abc&lf-content=77593265%3A5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com&something=abc'
      ];
      hashes.forEach(function (hash) {
        var parsed = uriInterpreter.parse(hash);
        expect(parsed.collectionId).toBe('77593265');
        expect(parsed.contentId).toBe('5d1d7c5bbcae4d9da656c00e8354a08c@livefyre.com');
        expect(parsed.environment).toBeUndefined();
        expect(parsed.network).toBe('livefyre.com');
      });
    });

    it('would properly parse permalink hashes if included an environment segment', function () {
      var hashes = [
        '#lf-content=t402.livefyre.com:108098985:259357490',
        '#blah?who#blah#lf-content=t402.livefyre.com:108098985:259357490#NOMG',
        '?lf-content=t402.livefyre.com:108098985:259357490',
        '?lf-content=t402.livefyre.com:108098985:259357490&test=abc',
        '?test=abc&lf-content=t402.livefyre.com:108098985:259357490',
        '?test=abc&lf-content=t402.livefyre.com:108098985:259357490&xyz=foo',
        '#lf-content=t402.livefyre.com%3A108098985%3A259357490',
        '#blah?who#blah#lf-content=t402.livefyre.com%3A108098985%3A259357490#NOMG',
        '?lf-content=t402.livefyre.com%3A108098985%3A259357490',
        '?lf-content=t402.livefyre.com%3A108098985%3A259357490&test=abc',
        '?test=abc&lf-content=t402.livefyre.com%3A108098985%3A259357490',
        '?test=abc&lf-content=t402.livefyre.com%3A108098985%3A259357490&xyz=foo'
      ];
      hashes.forEach(function (hash) {
        var parsed = uriInterpreter.parse(hash);
        expect(parsed.collectionId).toBe('108098985');
        expect(parsed.contentId).toBe('259357490');
        expect(parsed.environment).toBe('t402.livefyre.com');
        expect(parsed.network).toBe('livefyre.com');
      });
    });

    it('uses custom network if present on permalink url', function () {
      var hashes = [
        '#lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co&test=abc',
        '?test=abc&lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?test=abc&lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co&xyz=def',
        '#lf-content=74579420%3A6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?lf-content=74579420%3A6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?lf-content=74579420%3A6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co&test=abc',
        '?test=abc&lf-content=74579420%3A6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co',
        '?test=abc&lf-content=74579420%3A6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co&xyz=def'
      ];
      hashes.forEach(function (hash) {
        var parsed = uriInterpreter.parse(hash);
        expect(parsed.collectionId).toBe('74579420');
        expect(parsed.contentId).toBe('6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co');
        expect(parsed.environment).toBeUndefined();
        expect(parsed.network).toBe('heremedia-int-0.fyre.co');
      });
    });

    it('correctly parses instagram content', function () {
      var hash = '#lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@instagram.com';
      var parsed = uriInterpreter.parse(hash);
      expect(parsed.collectionId).toBe('74579420');
      expect(parsed.contentId).toBe('6bfc8fa440b841b4ba1a7c0952683a1c@instagram.com');
      expect(parsed.environment).toBeUndefined();
      expect(parsed.network).toBe('livefyre.com');
    });

    it('correctly parses twitter content', function () {
      var hash = '#lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@twitter.com';
      var parsed = uriInterpreter.parse(hash);
      expect(parsed.collectionId).toBe('74579420');
      expect(parsed.contentId).toBe('6bfc8fa440b841b4ba1a7c0952683a1c@twitter.com');
      expect(parsed.environment).toBeUndefined();
      expect(parsed.network).toBe('livefyre.com');
    });

    it('throws errors if invalid environments are provided', function () {
      var hash1 = '?lf-content=108098985%3A259357490';
      expect(function () {
        uriInterpreter.parse(hash1);
      }).not.toThrow();

      var hash2 = '?lf-content=hack.com:108098985:259357490';
      expect(function () {
        uriInterpreter.parse(hash2);
      }).toThrow();

      var hash3 = '#lf-content=74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co';
      expect(function () {
        uriInterpreter.parse(hash3);
      }).not.toThrow();

      var hash4 = '#lf-content=hack.com/abc.php?abc:74579420:6bfc8fa440b841b4ba1a7c0952683a1c@heremedia-int-0.fyre.co';
      expect(function () {
        uriInterpreter.parse(hash4);
      }).toThrow();
    });
  });

  describe('.getContentPermalink()', function () {
    it('works with query params', function () {
      var parsed = uriInterpreter.getContentPermalink({
        hash: '',
        search: '?lf-content=108098985:259357490'
      });
      expect(parsed.collectionId).toBe('108098985');
      expect(parsed.contentId).toBe('259357490');
      expect(parsed.environment).toBeUndefined();
      expect(parsed.network).toBe('livefyre.com');
    });

    it('works with hashes', function () {
      var parsed = uriInterpreter.getContentPermalink({
        hash: '#lf-content=108098985:259357490',
        search: ''
      });
      expect(parsed.collectionId).toBe('108098985');
      expect(parsed.contentId).toBe('259357490');
      expect(parsed.environment).toBeUndefined();
      expect(parsed.network).toBe('livefyre.com');
    });

    it('returns undefined when there isn\'t a "lf-content" field', function () {
      expect(uriInterpreter.getContentPermalink()).toBeUndefined();
    });
  });

  describe('.isNetworkValid', function () {
    it('returns a boolean as to whether the network does not end with livefyre.com / fyre.co', function () {
      var isValid1 = uriInterpreter.isNetworkValid('exploit.com');
      expect(isValid1).toBe(false);

      var isValid2 = uriInterpreter.isNetworkValid('somenetwork.fyre.co');
      expect(isValid2).toBe(true);

      var isValid3 = uriInterpreter.isNetworkValid('livefyre.com');
      expect(isValid3).toBe(true);

      var isValid4 = uriInterpreter.isNetworkValid('livefyre.com.ca');
      expect(isValid4).toBe(false);

      var isValid5 = uriInterpreter.isNetworkValid('hack.fyre.co2');
      expect(isValid5).toBe(false);
    });
  });

  describe('.isEnvironmentValid', function () {
    it('returns a boolean as to whether the env does not match Livefyre valid env format', function () {
      var isValid1 = uriInterpreter.isEnvironmentValid('exploit.com');
      expect(isValid1).toBe(false);

      var isValid2 = uriInterpreter.isEnvironmentValid('somenetwork.fyre.co');
      expect(isValid2).toBe(false);

      var isValid3 = uriInterpreter.isEnvironmentValid('qa-ext.livefyre.com');
      expect(isValid3).toBe(true);

      var isValid4 = uriInterpreter.isEnvironmentValid('hurray.livefyre.com');
      expect(isValid4).toBe(true);
    });
  });
});
