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

var Packet = require('./packet');

/**
 * Command Packet Constructor. Command Packets are sent over bluetooth to
 * devices in order to issue a command.
 *
 * ### Examples:
 *
 *    var command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);
 *
 * @param {Number} DID: Device Id
 * @param {Number} CID: Command Id
 * @param {Number} SEQ: Sequence Number
 * @param {Buffer} Data: Optional data to send with the packet
 * @param {Boolean} requestAnswer: whether or not the device should respond.
 * @param {Boolean} resetTimeout: specifies whether or not the device should resest its timer since it last received a command.
 * @return {Buffer} A buffer of the specified packet.
 * @api public
 */
function CommandPacket(did, cid, seq, data, requestAnswer, resetTimeout) {

  Packet.call(this);

  //SOP1 SOP2 DID CID SEQ DLEN CHK
  var packetBuffer = new Buffer(data.length + 0x07);

  packetBuffer.writeUInt8(0xFF, 0x00); //SOP1

  var sop2 = 0xFC | (resetTimeout && 0x02) | (requestAnswer && 0x01);
  packetBuffer.writeUInt8(sop2, 0x01); //SOP2

  packetBuffer.writeUInt8(did || 0x00, 0x02); //DID
  packetBuffer.writeUInt8(cid || 0x00, 0x03); //CID
  packetBuffer.writeUInt8(seq || 0x00, 0x04); //SEQ

  data = data || new Buffer(0);
  packetBuffer.writeUInt8(data.length + 0x01, 0x05); //DLEN
  data.copy(packetBuffer, 0x06); //DATA

  var checksum = this.computeCheckSum(packetBuffer);
  packetBuffer.writeUInt8(checksum, data.length + 0x06); //CHCK

  return packetBuffer;
}
CommandPacket.prototype = Object.create(Packet.prototype);

module.exports = CommandPacket;
