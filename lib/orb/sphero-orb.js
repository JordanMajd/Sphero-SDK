/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const Orb = require('./orb');
const SpheroCommand = require('../sphero-command');

function Sphero(uuid){
  Orb.call(this, uuid, SpheroCommand, false);
}
Sphero.prototype = Object.create(Orb.prototype);

module.exports = Sphero;
