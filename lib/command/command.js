/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const PromiseBB = require('bluebird');

/**
 * Module exports.
 * @public
 */

module.exports = Command;

/**
 * Initialize a new `Command` with the given `connection`.
 *
 * See: http://sdk.sphero.com/api-reference/api-quick-reference/
 *
 * Options:
 *
 *   - `connection` the devices connection property
 *
 * @param {Connection} connection
 * @public
 */

function Command(connection) {
  this.connection = connection;
}

/**
 * Send a command with the given `serviceId`, `characteristicId` and data to `connection`.
 *
 * @param {string} serviceId
 * @param {string} characteristicId
 * @param {CommandPacket} data
 * @public
 */

Command.prototype.send = function(serviceId, characteristicId, data) {
  return new PromiseBB((resolve, reject) => {
    this.connection.writeCharactaristic(serviceId, characteristicId, data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Alias to `this.connection.connnect`
 *
 * @public
 */

Command.prototype.connect = function() {
  return this.connection.connect();
};

/**
 * Alias to `this.connection.disconnect`
 *
 * @public
 */

Command.prototype.disconnect = function() {
  return this.connection.disconnect();
};

/**
 * Alias to `this.connection.listDevices`
 *
 * @public
 */

Command.prototype.listDevices = function() {
  return this.connection.listDevices();
};

/**
 * Wait for given `duration` ms before returning.
 *
 * @param {string} serviceId
 * @public
 */

Command.prototype.wait = function(duration) {
  return new PromiseBB((resolve /*, reject*/) => {
    setTimeout(function () {
      resolve();
    }, duration);
  });
};
