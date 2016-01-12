'use strict';

let Orb = require('./orb');
let SpheroCommand = require('../sphero-command');

function Sphero(uuid){
  Orb.call(this, uuid, SpheroCommand, false);
}
Sphero.prototype = Object.create(Orb.prototype);

module.exports = Sphero;
