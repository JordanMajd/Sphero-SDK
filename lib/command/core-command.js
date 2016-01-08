'use strict';

//local imports
let command = require('./command');
let api = require('../api/core-api');

function CoreCommand(arg){
  console.log('heyo');
}

CoreCommand.prototype.ping = function(){
  console.error('not implemented');
};

CoreCommand.prototype.getVersion = function(){

};

CoreCommand.prototype.setBluetoothName = function(){

};

CoreCommand.prototype.getBluetoothName = function(){

};

CoreCommand.prototype.setAutoReconnect = function(){

};

CoreCommand.prototype.getAutoReconnect = function(){

};

CoreCommand.prototype.getPowerState = function(){

};

CoreCommand.prototype.setPowerState = function(){

};

CoreCommand.prototype.runLevelOneDiagnostics = function(){

};

CoreCommand.prototype.runLevelTwoDiagnostics = function(){

};

module.exports = CoreCommand;
