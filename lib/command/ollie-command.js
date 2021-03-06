/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';


/**
 * Module dependencies.
 * @private
 */

const PromiseBB = require('bluebird');
const BLE_SERVICE = require('../utility/services').BLE_SERVICE;
const CONTROL_SERVICE = require('../utility/services').CONTROL_SERVICE;
const SpheroCommand = require('./sphero-command');
const ResponsePacket = require('../packet/response-packet');

/**
 * Module exports.
 * @public
 */

module.exports = OllieCommand;

function OllieCommand(connection) {
  SpheroCommand.call(this, connection);
}
OllieCommand.prototype = Object.create(SpheroCommand.prototype);

/**
 * Override `Command.connect` to enable dev mode.
 *
 * @public
 */

OllieCommand.prototype.connect = function() {
  return this.connection.connect().then(() => {
    return this.setDevMode();
  });
};

OllieCommand.prototype.setDevMode = function() {

  return new PromiseBB((outerResolve, reject) => {

    this.setAntiDos()
      .then(() => {
        let returnPromise = this.setTXPower(7);
        return returnPromise;
      })
      .then(() => {
        let returnPromise = this.wake();
        return returnPromise;
      })
      .then(() => {

        return new PromiseBB((resolve) => {

          this.connection.notifyCharacteristic(CONTROL_SERVICE.id, CONTROL_SERVICE.responseCharacteristic, (data) => {
            console.log('RECEIVEING:', data);

            let response = new ResponsePacket(data);
          });

          resolve();
        });
      })
      .then(() => {
        return this.setBackLED(0);
      })
      .then(outerResolve)
      .catch(reject);
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

  return this.send(BLE_SERVICE.id, BLE_SERVICE.antiDosCharacteristic, data);
};

OllieCommand.prototype.setTXPower = function(value) {
  let data = new Buffer(value);
  return this.send(BLE_SERVICE.id, BLE_SERVICE.txPowerCharacteristic, data);
};

OllieCommand.prototype.wake = function() {
  let data = new Buffer(1);
  return this.send(BLE_SERVICE.id, BLE_SERVICE.wakeCharacteristic, data);
};
