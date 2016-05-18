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

const Orb = require('./orb');
const OllieCommand = require('../command/ollie-command');

function Ollie(uuid) {
    Orb.call(this, uuid, OllieCommand, true);
}
Ollie.prototype = Object.create(Orb.prototype);

module.exports = Ollie;
