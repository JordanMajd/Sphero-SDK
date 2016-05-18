/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const Ollie = require('./ollie-orb');

function BB8(uuid){
  Ollie.call(this, uuid);
}
BB8.prototype = Object.create(Ollie.prototype);

module.exports = BB8;
