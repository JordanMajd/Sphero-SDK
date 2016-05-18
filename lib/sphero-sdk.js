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

const Sphero = require('./device/sphero-device');
const Ollie = require('./device/ollie-device');
const BB8 = require('./device/bb8-device');

/**
 * Module exports.
 * @public
 */

module.exports.Sphero = Sphero;
module.exports.Ollie = Ollie;
module.exports.BB8 = BB8;
