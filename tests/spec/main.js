'ues strict';

var Permalink = require('streamhub-permalink');

describe('streamhub-permalink', function () {
    it('is an object and singleton wrapper for Permalink', function () {
        expect(typeof(Permalink)).toBe('object');
    });

    it('can getInstance() of a Permalink and always returns the same instance', function () {
        var pl1 = Permalink.getInstance();

        //TODO (joao) Test pl1 instanceOf the real Permalink

        var pl2 = (function () {
            var Permalink = require('streamhub-permalink');
            return Permalink.getInstance();
        })();

        expect(pl1).toBe(pl2);
    });
});