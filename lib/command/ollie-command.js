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

const PromiseBB = require('bluebird');
const BLE_SERVICE = require('../utility/services-list').BLE_SERVICE;
const CONTROL_SERVICE = require('../utility/services-list').CONTROL_SERVICE;
const SpheroCommand = require('./sphero-command');
const commandResolver = require('../utility/command-resolver');

function OllieCommand(connection) {
    SpheroCommand.call(this, connection);
}
OllieCommand.prototype = Object.create(SpheroCommand.prototype);

OllieCommand.prototype.setDevMode = function() {
    return new PromiseBB((outerResolve, reject) => {
        this.setAntiDos()
            .then(() => {
                let returnPromise = this.setTXPower(7);
                commandResolver.resolve();
                return returnPromise;
            })
            .then(() => {
                let returnPromise = this.wake();
                commandResolver.resolve();
                return returnPromise;
            })
            .then(() => {
                return new PromiseBB((resolve) => {
                    this.connection.notifyCharacteristic(CONTROL_SERVICE.id, CONTROL_SERVICE.responseCharacteristic, (data) => {
                        console.log('RECEIVEING:', data);
                        //TODO parse response packets
                        commandResolver.resolve();
                    });

                    //TODO no tiemout
                    setTimeout(resolve, 3000);
                });
            })
            .then(() => {
                return this.setBackLED(0);
            })
            .then(outerResolve)
            .catch(reject);

        commandResolver.resolve();
    });
};

OllieCommand.prototype.setAntiDos = function() {

    //TODO: get rid of magic bytes
    let str = "011i3";
    let bytes = [];

    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }

    let data = new Buffer(bytes);

    return this.create(BLE_SERVICE.id, BLE_SERVICE.antiDosCharacteristic, data);
};

OllieCommand.prototype.setTXPower = function(value) {
    let data = new Buffer(value);
    return this.create(BLE_SERVICE.id, BLE_SERVICE.txPowerCharacteristic, data);
};

OllieCommand.prototype.wake = function() {
    let data = new Buffer(1);
    return this.create(BLE_SERVICE.id, BLE_SERVICE.wakeCharacteristic, data);
};

module.exports = OllieCommand;
