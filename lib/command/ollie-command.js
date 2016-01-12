'use strict';

let BLE_SERVICE = require('../utility/services-list').BLE_SERVICE;
let SpheroCommand = require('./sphero-command');

function OllieCommand(){
  SpheroCommand().call(this);
}
OllieCommand.prototype = Object.create(SpheroCommand.prototype);

OllieCommand.prototype.setAntiDos = function(){
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.antiDosCharacteristic
};

OllieCommand.prototype.setTXPower = function(){
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.txPowerCharacteristic
};

OllieCommand.prototype.wake = function(){
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.wakeCharacteristic;
};
