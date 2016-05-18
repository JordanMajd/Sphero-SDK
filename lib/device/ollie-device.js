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

const Device = require('./device');
const OllieCommand = require('../command/ollie-command');

/**
 * Module exports.
 * @public
 */

module.exports = Ollie;

/**
 * Initialize a new `Ollie` with the given `uuid`. Extends `Device`.
 *
 * Options:
 *
 *   - `uuid` the uuid of the device
 *
 * @param {string} uuid
 * @public
 */

function Ollie(uuid) {
  Device.call(this, uuid, OllieCommand, true);
}
Ollie.prototype = Object.create(Device.prototype);
