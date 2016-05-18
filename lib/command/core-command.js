/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const api = require('../api/core-api');
const Command = require('./command');

function CoreCommand(connection) {
    Command.call(this, connection);
}
CoreCommand.prototype = Object.create(Command.prototype);

CoreCommand.prototype.ping = function() {

};

CoreCommand.prototype.getVersion = function() {

};

CoreCommand.prototype.setBluetoothName = function() {

};

CoreCommand.prototype.getBluetoothName = function() {

};

CoreCommand.prototype.setAutoReconnect = function() {

};

CoreCommand.prototype.getAutoReconnect = function() {

};

CoreCommand.prototype.getPowerState = function() {

};

CoreCommand.prototype.setPowerState = function() {

};

CoreCommand.prototype.runLevelOneDiagnostics = function() {

};

CoreCommand.prototype.runLevelTwoDiagnostics = function() {

};

module.exports = CoreCommand;
