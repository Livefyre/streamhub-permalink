'ues strict';

var Content = require('streamhub-sdk/content');
var EventEmitter = require('event-emitter');
var Permalink = require('streamhub-permalink/permalink');
var util = require('streamhub-sdk/util');

describe('streamhub-permalink/permalink', function () {
    it('is a constructor that extends Event-Emitter', function () {
        var pl = new Permalink();
        expect(pl instanceof EventEmitter).toBe(true);
    });

    describe('when constructed', function () {
        var content,
            key = 'key',
            pl,
            url;
        beforeEach(function () {
            content = new Content({body: 'text'});
            url = 'http://www.fake.com/article/?lf-content=10772933:26482715';
            pl = new Permalink();
        })

        xit('checks the uri immediately', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('can ._generateDafaultHandler()', function () {
            var hdlr = pl._generateDefaulHandler();

            expect(hdlr).toEqual(
                {
                    prevented: false,
                    fn: util.nullFunction,
                    context: pl,
                    args: []
                }
            );
        });

        it('can ._generateDafaultHandler() with fn, context, and args', function () {
            var spy = jasmine.createSpy();
            var args = [spy, 23];
            var hdlr = pl._generateDefaulHandler(spy, spy, args);

            expect(hdlr).toEqual(
                {
                    prevented: false,
                    fn: spy,
                    context: spy,
                    args: args
                }
            );
        });
        
        it('can ._set() an item in the warehouse using a key', function () {
            expect(pl._warehouse[key]).toBeUndefined();

            pl._set(key, content);

            expect(pl._warehouse[key]).toBe(content);
        });
        
        it('throws if you try to ._set() without a key or item', function () {
            expect(function () {
                pl._set();
            }).toThrow();
            expect(function () {
                pl._set(key);
            }).toThrow();
            expect(function () {
                pl._set(undefined, content);
            }).toThrow();
        });
        
        xit('logs if the warehouse already has an item for the key that you tried to ._set()', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('emits the key name when ._set(), but not the item', function () {
            var spy = jasmine.createSpy('set key event');
            pl.once(key, spy);

            pl._set(key, content);

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(content);
        });
        
        it('calls the default handler for a ._set() key, so long as it hasn\'t been .preventDefault\'d', function () {
            var spy = jasmine.createSpy('default handler');
            pl.default(key, spy);

            pl._set(key, content);

            expect(spy).toHaveBeenCalledWith(content);
        });
        
        it('can be .preventDefault()\'d from executing a default handler for a key, whether or not a handler has been specified', function () {
            var spy = jasmine.createSpy('default handler');
            pl.default(key, spy);

            pl.preventDefault(key);
            pl._set(key, content);

            expect(spy).not.toHaveBeenCalled();
        });
        
        xit('logs and returns early if you try to .preventDefault() it without specifying a key', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('.get()\'s an item by key and returns undefined when the key doesn\'t exist', function () {
            pl._set(key, content);

            expect(pl.get(key)).toBe(content);
            expect(pl.get('FAKE')).toBeUndefined();
        });
        
        it('can set a .default() handler function for a key', function () {
            var spy = jasmine.createSpy();
            pl.default(key, spy);

            expect(pl._handlers[key].fn).toBe(spy);
        });
        
        it('can set a .default() handler with context and args provided', function () {
            var spy = jasmine.createSpy();
            var args = [spy, 23];
            pl.default(key, spy, spy, args);

            expect(pl._handlers[key].fn).toBe(spy);
            expect(pl._handlers[key].context).toBe(spy);
            expect(pl._handlers[key].args).toBe(args);
        });
        
        xit('logs when you attempt to set a .default() without a key or function', function () {
            throw 'TODO (joao) Implement this!';
        });

        describe('has getters and handlers for', function () {
            describe('content', function () {
                xit('can ._getContent() with a collectionId and contentId', function () {

                    pl._getConent('12345', '67890');
                    
                    throw 'TODO (joao) Implement this!';
                });
                
                xit('._getContentHandler() to ._set() content', function () {
                    throw 'TODO (joao) Implement this!';
                });
                
                xit('._getContentHandler() handles an error', function () {
                    throw 'TODO (joao) Implement this!';
                });
            });
        });
    });
});