/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

/**
 * # command-packet.js
 *
 * This file is responsible for creating, reading and managing valid sphero
 * packets.
 *
 * @author Jordan Majd <jordan@madtitanstudios.com>
 * @version 0.0.1
 */
'use strict';

/**
 * Module dependencies.
 * @private
 */

const Packet = require('./packet');

/**
 * Command Packet Constructor. Command Packets are sent over bluetooth to
 * devices in order to issue a command.
 *
 * ### Examples:
 *
 *    let command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);
 *
 * @param {Number} DID: Device Id
 * @param {Number} CID: Command Id
 * @param {Buffer} Data: Optional data to send with the packet
 * @param {Number} SEQ: Sequence Number
 * @param {Boolean} requestAnswer: whether or not the device should respond.
 * @param {Boolean} resetTimeout: specifies whether or not the device should resest its timer since it last received a command.
 * @api public
 */
function CommandPacket(did, cid, data, seq, requestAnswer, resetTimeout) {

  Packet.call(this);

  if (requestAnswer === undefined) {
    requestAnswer = true;
  }

  if (resetTimeout === undefined) {
    resetTimeout = true;
  }

  this.sop1 = 0xFF;
  this.sop2 = 0xFC | (resetTimeout && 0x02) | (requestAnswer && 0x01);
  this.did = did || 0x00;
  this.cid = cid || 0x00;
  this.seq = seq || 0x00;
  this.data = data || new Buffer(0);
  this.dlen = this.data.length + 0x01;

  //SOP1 SOP2 DID CID SEQ DLEN CHK
  this.packetBuffer = new Buffer(data.length + 0x07);

  this.packetBuffer.writeUInt8(this.sop1, 0x00); //SOP1
  this.packetBuffer.writeUInt8(this.sop2, 0x01); //SOP2
  this.packetBuffer.writeUInt8(this.did, 0x02); //DID
  this.packetBuffer.writeUInt8(this.cid, 0x03); //CID
  this.packetBuffer.writeUInt8(this.seq, 0x04); //SEQ
  this.packetBuffer.writeUInt8(this.dlen, 0x05); //DLEN

  this.data.copy(this.packetBuffer, 0x06); //DATA

  this.chck = this.computeCheckSum(this.packetBuffer);
  this.packetBuffer.writeUInt8(this.chck, this.data.length + 0x06); //CHCK
}
CommandPacket.prototype = Object.create(Packet.prototype);

module.exports = CommandPacket;
