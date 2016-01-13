'use strict';

//npm imports
const PromiseBB = require('bluebird');

//local imports
const BLE_SERVICE = require('../utility/services-list').BLE_SERVICE;
const SpheroCommand = require('./sphero-command');

function OllieCommand(connection){
  SpheroCommand.call(this, connection);
}
OllieCommand.prototype = Object.create(SpheroCommand.prototype);

OllieCommand.prototype.setDevMode = function() {
  return new PromiseBB( (resolve, reject) => {
    this.setAntiDos()
      .then( () => {
        return this.setTXPower(7);
      })
      .then( () =>{
        return this.wake();
      })
      .then(resolve)
      .catch(reject);
  });
};

OllieCommand.prototype.setAntiDos = function() {

  // BLE_SERVICE.id;
  // BLE_SERVICE.characteristics.antiDosCharacteristic

  //TODO: get rid of magic bytes
  let str = "011i3";
  let bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  let data = new Buffer(bytes);

  return this.create(BLE_SERVICE.id, BLE_SERVICE.characteristics.antiDosCharacteristic, data);
};

OllieCommand.prototype.setTXPower = function(value) {

  // BLE_SERVICE.id;
  // BLE_SERVICE.characteristics.txPowerCharacteristic

  let data = new Buffer(value);
  return this.create(BLE_SERVICE.id, BLE_SERVICE.characteristics.txPowerCharacteristic, data);
};

OllieCommand.prototype.wake = function() {

  // BLE_SERVICE.id;
  // BLE_SERVICE.characteristics.wakeCharacteristic;

  let data = new Buffer(1);
  return this.create(BLE_SERVICE.id, BLE_SERVICE.characteristics.wakeCharacteristic, data);
};

module.exports = OllieCommand;
