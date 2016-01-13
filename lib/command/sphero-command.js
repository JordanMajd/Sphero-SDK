'use strict';

//local imports
const CoreCommand = require('./core-command');
const CONTROL_SERVICE = require('../utility/services-list').CONTROL_SERVICE;
const CommandPacket = require('../packet/command-packet');
const API = require('../api/sphero-api');

function SpheroCommand(connection){
  CoreCommand.call(this, connection);
}
SpheroCommand.prototype = Object.create(CoreCommand.prototype);

SpheroCommand.prototype.roll = function(){
  let data = new Buffer([10,10, 1]);
  let packet = new CommandPacket(API.DID_SPHERO, API.CMD_ROLL, undefined, data);
  return this.create(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet.packetBuffer);
};

module.exports = SpheroCommand;
