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

const Command = require('./command');
const CommandPacket = require('../packet/command-packet');
const CORE_API = require('./utility/api').CORE_API;
const CONTROL_SERVICE = require('../utility/services').CONTROL_SERVICE;

/**
 * Module exports.
 * @public
 */

module.exports = CoreCommand;

/**
 * Initialize a new `CoreCommand` with the given `connection`. Extends `Command`.
 *
 * Options:
 *
 *   - `connection` the devices connection property
 *
 * @param {Connection} connection
 * @public
 */

function CoreCommand(connection) {
  Command.call(this, connection);
}
CoreCommand.prototype = Object.create(Command.prototype);


/**
 * Ping the device
 *
 * Device responds with a simple response: `DLEN` 01h
 *
 * @return {Promise}
 * @public
 */

CoreCommand.prototype.ping = function() {

  let packet = new CommandPacket(CORE_API.DID_CORE, CORE_API.CMD_PING).packetBuffer;

  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};

/**
 * Get the device's versioning information.
 *
 * Device responds with `DLEN` 0Bh and `Data`
 *
 * Data:
 *
 * - Name       Byte  Description
 * - `RECV`     0     This record version number, currently set to 02h. This will increase when more resources are added
 * - `MDL`      1     Model number; currently 02h for Sphero
 * - `HW`       2     Hardware version code (ranges 1 through 9)
 * - `MSA-ver`  3     Main Sphero Application version byte
 * - `MSA-rev` 	4     Main Sphero Application revision byte
 * - `BL`       5     Bootloader version in packed nibble format (i.e. 32h is version 3.2)
 * - `BAS` 	    6     orbBasic version in packed nibble format (i.e. 4.4)
 * - `MACRO` 	  7     Macro executive version in packed nibble format (4.4)
 * - `API-maj` 	8     major revision code this firmware implements
 * - `API-min` 	9     API minor revision code this firmware implements
 *
 * @return {Promise}
 * @public
 */

CoreCommand.prototype.getVersion = function() {

  let packet = new CommandPacket(CORE_API.DID_CORE, CORE_API.CMD_VERSION).packetBuffer;

  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};

/**
 * Set the device's bluetooth name.
 *
 * Device responds with a simple response
 *
 * Options:
 *
 *   - `name` the name to be set as the device's bluetooth name
 *
 * @param {string} name
 * @public
 */

CoreCommand.prototype.setBluetoothName = function( /*name*/ ) {
  console.error('Not implemented!');
};


CoreCommand.prototype.getBluetoothName = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.setAutoReconnect = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.getAutoReconnect = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.getPowerState = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.setPowerState = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.runLevelOneDiagnostics = function() {
  console.error('Not implemented!');
};

CoreCommand.prototype.runLevelTwoDiagnostics = function() {
  console.error('Not implemented!');
};
