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

const Connection = require('../connection/noble-connection');

/**
 * Module exports.
 * @public
 */

module.exports = Orb;

/**
 * Initialize a new `Orb` with the given `uuid` and `command`.
 *
 * Options:
 *
 *   - `uuid` the uuid of the device
 *   - `command` the command set the device uses
 *
 * @param {string} uuid
 * @param {Command} command
 * @public
 */

function Orb(uuid, Command) {

    this.uuid = uuid;

    //instantiate and assign connection object
    this.connection = new Connection(this.uuid);

    //instantiate and assign command object
    this.command = new Command(this.connection);
}
