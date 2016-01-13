'use strict';

const Ollie = require('./ollie-orb');

function BB8(uuid){
  Ollie.call(this, uuid);
}
BB8.prototype = Object.create(Ollie.prototype);

module.exports = BB8;
