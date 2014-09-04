'use strict';

var enums = require('streamhub-permalink/enums');
var EventEmitter = require('event-emitter');
var inherits = require('inherits');
var log = require('streamhub-sdk/debug')
        ('streamhub-permalink');
var uriInterpreter = require('streamhub-permalink/uri-interpreter');
var bind = require('mout/function/bind');

/**
 * Permalink checks the page URI on construction for Livefyre permalinking parameters.
 * When parameters are found, Permalink will retrieve the specified items from the
 * servers and store them for use by other Livefyre apps. Any app confirgured to display
 * permalinked items should try to get(key) the item by type key. If the item is undefined,
 * the app should listen to Permalink for that key, i.e. Permalink.on('key', fn).
 * Implementers can specify default handlers per item key using the default(key, fn) method. Apps
 * can call Permalink.prevent(key) to prevent Permalink from automatically executing the default
 * for a given key.
 * @constructor
 * @extends {EventEmitter}
 */
var Permalink = function () {
    EventEmitter.call(this);
    var msgEvent = window.addEventListener ? 'message' : 'onmessage';
    var addEvent = window.addEventListener || window.attachEvent;

    //Check for content permalink
    var content = uriInterpreter.getContentPermalink();
    if (content) {
        addEvent(msgEvent, bind(this.onPostMessage, this), false);
        //Load the code to parse, fetch, and display content
        require('streamhub-permalink/handlers/content')(this, enums.KEYS.CONTENT, content, bind(this.sendRegistration, this));
    }
};
inherits(Permalink, EventEmitter);


Permalink.prototype.onPostMessage = function(event){
    var msg = null; 

    if(typeof event.data === 'object') 
        msg = event.data 
    else {
        try{ 
            msg = JSON.parse(event.data)
        } catch(e){ 
            //failure can occur on messages that just send normal strings
            //or maleformed JSON, so just return.
            return; 
        }       
    }

    //Return if the message isn't for me
    if(msg.to !== 'permalink-modal' || !msg.data || msg.action !== 'post') 
        return;
   
    this.recieveAppRegistration(msg.data)
};

Permalink.prototype.recieveAppRegistration = function(data){
    var self = this;
    //Only perform work if the app is related to the content in me (if I have any)
    var contentOptions = this.get(enums.KEYS.CONTENT_OPTIONS); 
    var collectionId = contentOptions && contentOptions.collectionId !== undefined ? contentOptions.collectionId : null;
    var contentId = contentOptions && contentOptions.contentId !== undefined ? contentOptions.contentId : null;
    if(!contentOptions || !collectionId || data.collectionId !== collectionId) 
        return;

    data.contentId = contentId;
    var button = this.modalView.el.querySelector('.permalink-button');

    var hasShow = button.className.indexOf('show');
    if(hasShow < 0)
        button.className += ' show';
    button.onclick = function(){
        self.modalView.hide();
        self.messageHubToPermalink(data);
    };
};

Permalink.prototype.messageHubToPermalink = function(data){
    var msg = {
        from: 'permalink-modal',
        to: 'permalink',
        action: 'put',
        data: data
    };
    window.postMessage(JSON.stringify(msg),'*');
};

Permalink.prototype.sendRegistration = function(){
    var msg = {
        from: 'permalink-modal',
        to: 'permalink',
        action: 'post',
        data: this.get(enums.KEYS.CONTENT_OPTIONS)
    };
    window.postMessage(JSON.stringify(msg),'*');
};

/**
 * A place for storing things in dictionary fassion.
 * @type {Object.<string, Object>}
 * @private
 */
Permalink.prototype._warehouse = {};

/**
 * The record for default item handler functions.
 * @typedef DefaultHandler {Object}
 * @property prevented {!boolean} True when the default handling has been
 *      prevented for this key.
 * @property fn {!function} The function to be called.
 *      It should take the item as its first argument.
 * @property [context] {Object=} The 'this' object for the functional.
 * @property [args] {Array=} A list of arguments to pass as well.
 */

/**
 * Creates a generic DefaultHandler object and returns it.
 * @param [fn] {function=}
 * @param [context] {Object=}
 * @param [args] {Array=}
 * @return {!DefaultHandler}
  */
 Permalink.prototype._generateDefaultHandler = function (fn, context, args) {
    return {
        prevented: false,
        fn: fn || util.nullFunction,
        context: context || this,
        args: args || []
    }
 };

/**
 * A place for storing the default item handlers.
 * @type {Object.<string, DefaultHandler>}
 * @private
 */
Permalink.prototype._handlers = {};

/**
 * Sets an item in the warehouse, then emits an event
 * @param key {!string} The key emitted and used to access the item.
 * @param item {!*} The item to be stored in the warehouse
 */
Permalink.prototype.set = function (key, item) {
    if (!key || typeof(item) === 'undefined') {
        throw new Error('Attempted to ._set without key or item');
        return;
    }

    var exists = this._warehouse[key];
    if (exists) {
        throw new Error('Attemped to overide an existing key, ' + key);
        return;
    }

    //Set the item in the warehouse
    this._warehouse[key] = item;

    //Emit the key, but not the item. Force the listener to use Permalink.get(key);
    this.emit(key);

    //If default handler exists and hasn't been prevented, execute it.
    var dh = this._handlers[key];
    dh && !dh.prevent && dh.fn.apply(dh.context, [item].concat(dh.args));
};

/**
 * Called by any listener to prevent Permalink from executing the default function
 * for this key.
 * @param key {!string} The key to prevent.
 */
Permalink.prototype.preventDefault = function (key) {
    if (!key) {
        log('Attempted to .prevent without key');
        return;
    }

    var dh = this._handlers[key];
    if (!dh) {
        dh = this._generateDefaultHandler();
        this._handlers[key] = dh;
    }
    dh.prevent = true;
};

/**
 * Returns the item/undefined from the warehouse.
 * @param key {!string} The key to the item.
 * @returns {*=} The item in the warehouse or undefined.
 */
Permalink.prototype.get = function (key) {
    return key && this._warehouse[key];
};

/**
 * Used to set a default handler function for an item.
 * The function must accept the item as its first argument.
 * @param key {!string} The key to apply the function for.
 * @param fn {!function} The handler function. The item is passed as the first argument.
 * @param [context] {Object=} The 'this' object for calling the function.
 * @param [args] {Array=} Additional arguments to pass to the function.
 * @returns {!DefaultHandler} The DefaultHandler object stored in ._handlers
 */
Permalink.prototype.default = function (key, fn, context, args) {
    if (!key || !fn) {
        log('Attempted to .default without key or function');
        return this._generateDefaultHandler();
    }

    var dh = this._generateDefaultHandler(fn, context, args);
    this._handlers[key] = dh;
    return dh;
};

module.exports = Permalink;
