'use strict';


function CommandResolver(){
  this.resolutions = [];
}

//TODO sequencing
// takes in a promise or a callback
CommandResolver.prototype.addResolution = function(resFunc){
  // console.log('adding' + this.resolutions.length);
  this.resolutions.push(resFunc);
};

CommandResolver.prototype.resolve = function(){
  // console.log('executing: ' + this.resolutions.length);
  this.resolutions.shift()();
};

let commandResolverSingleton = new CommandResolver();

module.exports = commandResolverSingleton;
