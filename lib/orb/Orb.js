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

const Connection = require('../connection/noble-connection');

function Orb(uuid, Command) {

    this.uuid = uuid;

    //instantiate and assign connection object
    this.connection = new Connection(this.uuid);

    //instantiate and assign command object
    this.command = new Command(this.connection);
}

//exports
module.exports = Orb;
