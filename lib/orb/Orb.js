'use strict';

//npm imports
let BlueBird = require('bluebird');
let CoreCommand = require('../command/core-command');
let SpheroCommand = require('../command/sphero-command');

function Orb(id){

    //add commands
    this.implementCommandLib(CoreCommand);
    this.implementCommandLib(SpheroCommand);

    //detect type and connect to bluetooth

    return new BlueBird(function(resolve, reject){

    });
}

Orb.prototype.implementCommandAPI = function(CommandLib){
  let commandProto = Object.getPrototypeOf(new CommandLib());
  for(let prop in commandProto){
    if(this[prop]){
      console.warn('Warn: property ' +  prop + ' already exists on robot, overriding!');
    }
    this[prop] = commandProto[prop];
  }
};

//exports
module.exports = Orb;
