'use strict';

//npm imports
const PromiseBB = require('bluebird');

//local imports
const BLE_SERVICE = require('../utility/services-list').BLE_SERVICE;
const CONTROL_SERVICE = require('../utility/services-list').CONTROL_SERVICE;
const SpheroCommand = require('./sphero-command');
const ResponsePacket = require('../packet/response-packet');

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
      .then( () => {
        return new PromiseBB( (resolve) => {
          this.connection.readCharacteristic(CONTROL_SERVICE.id, CONTROL_SERVICE.responseCharacteristic, (data, isNotification) => {
              console.log('responded!');
              console.log(data);
              // console.log(data.toString());
              // console.log(data.length);
              // console.log(isNotification);
              for(let i = 0; i < data.length; i++){
                console.log(data.readUInt8(i));
              }
              if(data.length > 5){
                let resp = new ResponsePacket(data);
                console.log(resp.sop1);
                console.log(resp.sop2);
                console.log(resp.msrp);
                console.log(resp.seq);
                console.log(resp.dlen);
                console.log(resp.data);
                console.log(resp.chck);
              }

          });
          this.connection.notifyCharacteristic(CONTROL_SERVICE.id, CONTROL_SERVICE.responseCharacteristic, (error) => {
            console.log('Set Notify');
            if(error){
              console.log(error);
            }
          });
          resolve();
        });
      })
      .then(resolve)
      .catch(reject);
  });
};

OllieCommand.prototype.setAntiDos = function() {

  // BLE_SERVICE.id;
  // BLE_SERVICE.antiDosCharacteristic

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

  // BLE_SERVICE.id;
  // BLE_SERVICE.txPowerCharacteristic

  let data = new Buffer(value);
  return this.create(BLE_SERVICE.id, BLE_SERVICE.txPowerCharacteristic, data);
};

OllieCommand.prototype.wake = function() {

  // BLE_SERVICE.id;
  // BLE_SERVICE.wakeCharacteristic;

  let data = new Buffer(1);
  return this.create(BLE_SERVICE.id, BLE_SERVICE.wakeCharacteristic, data);
};

module.exports = OllieCommand;
