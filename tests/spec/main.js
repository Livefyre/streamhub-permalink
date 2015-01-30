'ues strict';

var Permalink = require('streamhub-permalink');

describe('streamhub-permalink', function () {
    it('is an object and singleton wrapper for Permalink', function () {
        expect(typeof(Permalink)).toBe('object');
    });
});
