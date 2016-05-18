/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

function Orb(uuid, Command, isBLE) {

    this.uuid = uuid;

    //detect type and connect to bluetooth
    let Connection;
    if (isBLE) {
        Connection = require('../connection/noble-connection');
    } else {
        Connection = require('../connection/serial-connection');
    }
    //instantiate and assign connection object
    this.connection = new Connection(this.uuid);

    //instantiate and assign command object
    this.command = new Command(this.connection);
}

//exports
module.exports = Orb;
