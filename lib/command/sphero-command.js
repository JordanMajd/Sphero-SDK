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

const CoreCommand = require('./core-command');
const CommandPacket = require('../packet/command-packet');
const SPHERO_API = require('../utility/api').SPHERO_API;
const CONTROL_SERVICE = require('../utility/services').CONTROL_SERVICE;

/**
 * Module exports.
 * @public
 */

module.exports = SpheroCommand;


function SpheroCommand(connection) {
  CoreCommand.call(this, connection);
}
SpheroCommand.prototype = Object.create(CoreCommand.prototype);

// CMD_SET_CAL: 0x01, <====== YOU ARE HERE
SpheroCommand.prototype.setCalibration = function(heading) {

  //valid heading 0 - 359, 16 bits to send, 9 bits max value
  heading &= 0x1FF;

  let data = new Buffer(2);
  data.writeUInt16BE(heading);

  let packet = new CommandPacket(SPHERO_API.DID_SPHERO, SPHERO_API.CMD_SET_CAL, data).packetBuffer;
  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};
SpheroCommand.prototype.setHeading = SpheroCommand.prototype.setCalibration;

// CMD_SET_STABILIZ: 0x02,
SpheroCommand.prototype.setStabilize = function(value) {

  //value either 0 or 1
  value &= 0x01;

  let data = new Buffer(1);
  data.writeUInt8(value);

  let packet = new CommandPacket(SPHERO_API.DID_SPHERO, SPHERO_API.CMD_SET_STABILIZ, data).packetBuffer;
  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};
// CMD_SET_ROTATION_RATE: 0x03,
// CMD_REENABLE_DEMO: 0x06,
// CMD_SELF_LEVEL: 0x09,
// CMD_SET_DATA_STREAMING: 0x11,
// CMD_SET_COLLISION_DET: 0x12,
// CMD_LOCATOR: 0x13,
// CMD_SET_ACCELERO: 0x14,
// CMD_READ_LOCATOR: 0x15,
// CMD_SET_RGB_LED: 0x20,
// CMD_SET_BACK_LED: 0x21,
SpheroCommand.prototype.setBackLED = function(intensity) {

  //ensure 8 bit;
  intensity &= 0xFF;

  let data = new Buffer(1);
  data.writeUInt8(intensity);

  let packet = new CommandPacket(SPHERO_API.DID_SPHERO, SPHERO_API.CMD_SET_BACK_LED, data).packetBuffer;
  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};
// CMD_GET_RGB_LED: 0x22,
// CMD_ROLL: 0x30,

//speed 0-255 uint8
//directoin 0-359 uint16
//state 0 - 3 ? uint8
SpheroCommand.prototype.roll = function(speed, direction, state) {

  //default state to 1
  if (!state) {
    state = 0x01;
  }

  //ensure speed is 8 bits.
  speed &= 0xFF;

  //valid heading 0 - 359, 16 bits to send, 9 bits max value
  direction &= 0x01FF;

  //ensure state is 0-3
  state &= 0x03;

  let data = new Buffer(4);
  data.writeUInt8(speed, 0);
  data.writeUInt16BE(direction, 1);
  data.writeUInt8(state, 3);

  let packet = new CommandPacket(SPHERO_API.DID_SPHERO, SPHERO_API.CMD_ROLL, data).packetBuffer;

  return this.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);
};

//TODO
// CMD_BOOST: 0x31,
// CMD_MOVE: 0x32,
// CMD_SET_RAW_MOTORS: 0x33,
// CMD_SET_MOTION_TO: 0x34,
// CMD_SET_OPTIONS_FLAG: 0x35,
// CMD_GET_OPTIONS_FLAG: 0x36,
// CMD_SET_TEMP_OPTIONS_FLAG: 0x37,
// CMD_GET_TEMP_OPTIONS_FLAG: 0x38,
// CMD_RUN_MACRO: 0x50,
// CMD_SAVE_TEMP_MACRO: 0x51,
// CMD_SAVE_MACRO: 0x52,
// CMD_INIT_MACRO_EXECUTIVE: 0x54,
// CMD_ABORT_MACRO: 0x55,
// CMD_MACRO_STATUS: 0x56,
// CMD_SET_MACRO_PARAM: 0x57,
// CMD_APPEND_TEMP_MACRO_CHUNK: 0x58,
// CMD_ERASE_ORBBAS: 0x60,
// CMD_APPEND_FRAG: 0x61,
// CMD_EXEC_ORBBAS: 0x62,
// CMD_ABORT_ORBBAS: 0x63,
// CMD_ANSWER_INPUT: 0x64
