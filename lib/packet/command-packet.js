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
