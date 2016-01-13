'use strict';

const BLE_SERVICE = require('../utility/services-list').BLE_SERVICE;
const SpheroCommand = require('./sphero-command');

function OllieCommand(){
  SpheroCommand().call(this);
}
OllieCommand.prototype = Object.create(SpheroCommand.prototype);

OllieCommand.prototype.setDevMode = () =>{

};

OllieCommand.prototype.setAntiDos = () => {
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.antiDosCharacteristic
};

OllieCommand.prototype.setTXPower = () => {
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.txPowerCharacteristic
};

OllieCommand.prototype.wake = () => {
// BLE_SERVICE.id;
// BLE_SERVICE.charactersitcs.wakeCharacteristic;
};
