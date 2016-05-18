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
 * Ping the device.
 *
 * @public
 */
CoreCommand.prototype.ping = function() {
  console.error('Not implemented!');
};

/**
 * Get the device's version.
 *
 * @public
 */
CoreCommand.prototype.getVersion = function() {
  console.error('Not implemented!');
};

/**
 * Set the device's bluetooth name.
 *
 * Options:
 *
 *   - `name` the name to be set as the device's bluetooth name
 *
 * @param {string} name
 * @public
 */
CoreCommand.prototype.setBluetoothName = function(name) {
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
