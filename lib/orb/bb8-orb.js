'use strict';
let Ollie = require('./ollie-orb');

function BB8(uuid){
  Ollie.call(this, uuid);
}
BB8.prototype = Object.create(Ollie.prototype);

modle.exports = BB8;
