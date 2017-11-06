/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

/**
 * Command Resolver Constructor
 *
 * @api public
 */

function CommandResolver() {
  this.resolutionQueue = [];
}


/**
 * addResolution adds a callback function or promise to the resolutionQueue.
 *
 * @param {Function} resFunc: this is a callback function or promise that will
 * invoked or resolved when the command is successfully issued and the orb has responded.
 *
 * @api public
 */

CommandResolver.prototype.addResolution = function(resFunc) {
  //TODO Needs sequencing wrapping 0-255
  this.resolutionQueue.push(resFunc);
};

/**
 * invokes / resolves the next callback function / promise in the resolutionQueue.
 *
 * @api public
 */

CommandResolver.prototype.resolve = function(packet) {
  if(this.resolutionQueue.length > 0){
    this.resolutionQueue.shift()(packet);
  }
};


let commandResolverSingleton = new CommandResolver();

module.exports = commandResolverSingleton;
