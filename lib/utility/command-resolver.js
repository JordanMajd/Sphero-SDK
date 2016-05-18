'use strict';

/**
 * Command Resolver Constructor
 *
 * @api public
 */
function CommandResolver(){
  this.resolutionQueue = [];
}

//TODO sequencing
/**
 * addResolution adds a callback function or promise to the resolutionQueue.
 *
 * @param {Function} resFunc: this is a callback function or promise that will
 * invoked or resolved when the command is successfully issued and the orb has responded.
 *
 * @api public
 */
CommandResolver.prototype.addResolution = function(resFunc){
  this.resolutionQueue.push(resFunc);
};

CommandResolver.prototype.resolve = function(){
  this.resolutionQueue.shift()();
};

let commandResolverSingleton = new CommandResolver();

module.exports = commandResolverSingleton;
