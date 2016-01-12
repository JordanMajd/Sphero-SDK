'use strict';

//local imports
let Command = require('./command');
let api = require('../api/core-api');

function CoreCommand(){
  Command.call(this);
}
CoreCommand.prototype = Object.create(Command.prototype);

CoreCommand.prototype.ping = function(){

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
