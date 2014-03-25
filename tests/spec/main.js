'strict';

var Permalink = require('streamhub-permalink');

describe('streamhub-permalink', function () {
    it('is a constructor that extends Event-Emitter', function () {
        throw 'TODO (joao) Implement this!';
    });

    describe('when constructed', function () {
        it('checks the uri immediately', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('can ._generateDafaultHandler()', function () {
            throw 'TODO (joao) Implement this!';
        });

        it('can ._generateDafaultHandler() with fn, context, and args', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('can ._set() an item in the warehouse using a key', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('throws if you try to ._set() without a key or item', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('logs and returns if the warehouse already has an item for the key that you tried to ._set()', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('emits the key name when ._set()', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('calls the default handler for a ._set() key, unless it has been .prevent\'d', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('can be .prevent()\'d from executing a default handler for a key, whether or not a handler has been specified', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('logs and returns early if you try to .prevent() it without specifying a key', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('.get()\'s an item by key and returns undefined when the key doesn\'t exist', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('can set a .default() handler function for a key', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('can set a .default() handler with context and args provided', function () {
            throw 'TODO (joao) Implement this!';
        });
        
        it('logs when you attempt to set a .default() without a key or function', function () {
            throw 'TODO (joao) Implement this!';
        });

        describe('has getters and handlers for', function () {
            describe('content', function () {
                it('._getContent() with a collectionId and contentId', function () {
                    throw 'TODO (joao) Implement this!';
                });
                
                it('._getContentHandler() to ._set() content', function () {
                    throw 'TODO (joao) Implement this!';
                });
                
                it('._getContentHandler() handles an error', function () {
                    throw 'TODO (joao) Implement this!';
                });
            });
        });
    });
});