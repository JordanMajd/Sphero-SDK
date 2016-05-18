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

const PromiseBB = require('bluebird');
const commandResolver = require('../utility/command-resolver');

/**
 * Module exports.
 * @public
 */

module.exports = Command;

/**
 * Initialize a new `Command` with the given `connection`.
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
 * @private
 */

Command.prototype.send = function(serviceId, characteristicId, data) {
    return new PromiseBB((resolve, reject) => {
        this.connection.writeCharectaristic(serviceId, characteristicId, data, (error) => {
            if (error) {
                reject(error);
            } else {
                commandResolver.addResolution(resolve);
            }
        });
    });
};
