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

const Ollie = require('./ollie-device');

/**
 * Module exports.
 * @public
 */

module.exports = BB8;

/**
 * Initialize a new `BB8` with the given `uuid`. Extends `Ollie`.
 *
 * Options:
 *
 *   - `uuid` the uuid of the device
 *
 * @param {string} uuid
 * @public
 */
 
function BB8(uuid) {
  Ollie.call(this, uuid);
}
BB8.prototype = Object.create(Ollie.prototype);
