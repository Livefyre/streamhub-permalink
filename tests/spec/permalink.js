'ues strict';

var Content = require('streamhub-sdk/content');
var EventEmitter = require('event-emitter');
var Permalink = require('streamhub-permalink/permalink');
var util = require('streamhub-sdk/util');

var mockApp = {"author": null, "createdAt": 1487716473723.0, "description": null, "elements": [{"component": {"capabilities": ["details", "settings", "stream", "designer"], "configSchema": {}, "hasAuth": true, "hasCollection": true, "hasUrl": false, "icons": [{"src": "fycon-icon-wall", "type": "fycon"}], "id": "58a501b9170e241b3d00202b", "isHiddenS1": false, "main": "streamhub-wall", "name": "streamhub-wall", "streamType": "threaded", "urn": "urn:livefyre:service=designer:component=media-wall", "version": "5.0.4"}, "config": {"collection": {"articleId": "designer-app-1487716472761", "environment": "qa-ext.livefyre.com", "id": "2634430", "network": "studio-qa-1.fyre.co", "siteId": 290656, "title": "unofficialmanman mw #2", "type": "threaded", "url": "https://designer-app.livefyre.com/app/1487716472761"}, "environment": "qa", "network": "studio-qa-1.fyre.co", "siteId": 290656, "type": "threaded"}, "id": "0"}], "id": "58acc079fa5edab63f004110", "name": null, "previousVersion": null, "title": "unofficialmanman mw #2", "updatedAt": 1487716473723.0, "version": "0"};
var mockApp2 = {"author": null, "createdAt": 1487722591914.0, "description": null, "elements": [{"component": {"capabilities": ["details", "settings", "stream", "designer"], "configSchema": {}, "hasAuth": true, "hasCollection": true, "hasUrl": false, "icons": [{"src": "fycon-icon-wall", "type": "fycon"}], "id": "58a646fe182a05f71700012b", "isHiddenS1": false, "main": "streamhub-wall", "name": "streamhub-wall", "streamType": "threaded", "urn": "urn:livefyre:service=designer:component=media-wall", "version": "5.0.4"}, "config": {"appName": "1c2f760b-0d6d-4349-833f-05937614774e", "buttonActiveBackgroundColor": "#cccccc", "buttonBorderColor": "rgba(0,0,0,0.3)", "buttonHoverBackgroundColor": "#f2f2f2", "buttonTextColor": "#666666", "cardBackgroundColor": "#fff", "collection": {"articleId": "designer-app-1487722590502", "environment": "t402.livefyre.com", "id": "75738870", "network": "studio-uat-1.fyre.co", "objectMode": true, "siteId": 306244, "title": "FB Public Feed Multi-Image Test", "url": "http://designer-app.livefyre.com/app/1487722590502"}, "environment": "staging", "fontFamily": "Georgia, Times, \"Times New Roman\", serif", "fontSize": "medium", "footerTextColor": "#b2b2b2", "forceButtonRender": true, "inDesigner": true, "inShare": false, "initial": 10, "linkAttachmentBackgroundColor": "#f2f2f2", "linkAttachmentBorderColor": "rgba(0,0,0,0.3)", "linkAttachmentTextColor": "#666666", "linkColor": "#0F98EC", "modal": true, "sampleData": false, "textColor": "#4c4c4c"}, "id": "0"}], "id": "58b4a3ab6a17847a40001def", "name": null, "previousVersion": null, "title": "FB Public Feed Multi-Image Test", "updatedAt": 1488233386717.0, "version": "3"};

describe('streamhub-permalink/permalink', function () {
    it('is a constructor that extends Event-Emitter', function () {
        var pl = new Permalink();
        expect(pl instanceof EventEmitter).toBe(true);
    });

    it('able to get a network from an app', function () {
        var network = Permalink.getNetworkFromApp(mockApp);
        expect(network).toBe('studio-qa-1.fyre.co');

        network = Permalink.getNetworkFromApp(mockApp2);
        expect(network).toBe('studio-uat-1.fyre.co');

        var badApp = {"elements": []};
        var network = Permalink.getNetworkFromApp(badApp);
        expect(network).toBe(null);
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
            var hdlr = pl._generateDefaultHandler();
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
            var hdlr = pl._generateDefaultHandler(spy, spy, args);

            expect(hdlr).toEqual(
                {
                    prevented: false,
                    fn: spy,
                    context: spy,
                    args: args
                }
            );
        });

        xit('can ._set() an item in the warehouse using a key', function () {
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

        xit('emits the key name when ._set(), but not the item', function () {
            var spy = jasmine.createSpy('set key event');
            pl.once(key, spy);

            pl._set(key, content);

            expect(spy).toHaveBeenCalled();
            expect(spy).not.toHaveBeenCalledWith(content);
        });

        xit('calls the default handler for a ._set() key, so long as it hasn\'t been .preventDefault\'d', function () {
            var spy = jasmine.createSpy('default handler');
            pl.default(key, spy);

            pl._set(key, content);

            expect(spy).toHaveBeenCalledWith(content);
        });

        xit('can be .preventDefault()\'d from executing a default handler for a key, whether or not a handler has been specified', function () {
            var spy = jasmine.createSpy('default handler');
            pl.default(key, spy);

            pl.preventDefault(key);
            pl._set(key, content);

            expect(spy).not.toHaveBeenCalled();
        });

        xit('logs and returns early if you try to .preventDefault() it without specifying a key', function () {
            throw 'TODO (joao) Implement this!';
        });

        xit('.get()\'s an item by key and returns undefined when the key doesn\'t exist', function () {
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
