'use strict';

const Orb = require('./orb');
const OllieCommand = require('../ollie-command');

function Ollie(uuid){
  Orb.call(this, uuid, OllieCommand, true);
}
Ollie.prototype = Object.create(Orb.prototype);

module.exports = Ollie;
