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

const Device = require('./device');
const SpheroCommand = require('../sphero-command');


/**
 * Module exports.
 * @public
 */

module.exports = Sphero;

/**
 * Initialize a new `Sphero` with the given `uuid`. Extends `Device`.
 *
 * Options:
 *
 *   - `uuid` the uuid of the device
 *
 * @param {string} uuid
 * @public
 */

function Sphero(uuid) {
  Device.call(this, uuid, SpheroCommand, false);
}
Sphero.prototype = Object.create(Device.prototype);
