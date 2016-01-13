'use strict';

//local imports
const Command = require('./command');
const api = require('../api/core-api');

function CoreCommand(){
  Command.call(this);
}
CoreCommand.prototype = Object.create(Command.prototype);

CoreCommand.prototype.ping = () => {

};

CoreCommand.prototype.getVersion = () => {

};

CoreCommand.prototype.setBluetoothName = () => {

};

CoreCommand.prototype.getBluetoothName = () => {

};

CoreCommand.prototype.setAutoReconnect = () => {

};

CoreCommand.prototype.getAutoReconnect = () => {

};

CoreCommand.prototype.getPowerState = () => {

};

CoreCommand.prototype.setPowerState = () => {

};

CoreCommand.prototype.runLevelOneDiagnostics = () => {

};

CoreCommand.prototype.runLevelTwoDiagnostics = () => {

};

module.exports = CoreCommand;
