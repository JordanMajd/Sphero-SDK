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

const Packet = require('./packet');

/**
 * Response Packet Constructor. Response Packets are sent from devices over
 * bluetooth.
 *
 * ### Examples:
 *
 *    var command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);
 *
 * @param {Buffer} responseBuffer: this is a buffer filled with the response packet data.imer since it last received a command.
 * @api public
 */
function ResponsePacket(packetBuffer) {

  Packet.call(this);

  //TODO handle shorter packets
  if(packetBuffer.length >= 5){
    //SOP1 SOP2 MRSP SEQ DLEN CHK
    this.sop1 = packetBuffer.readUInt8(0x00);
    this.sop2 = packetBuffer.readUInt8(0x01);
    this.msrp = packetBuffer.readUInt8(0x02);
    this.seq = packetBuffer.readUInt8(0x03);
    this.dlen = packetBuffer.readUInt8(0x04);
    if (this.dlen > 1) {
      this.data = packetBuffer.readUIntBE(0x05, this.dlen - 0x01);
    }
    this.chck = packetBuffer.readUInt8(this.dlen + 0x04);

    //validate checksum
    let calculatedChecksum = this.computeCheckSum(packetBuffer.slice(0x0, 0x04 + this.dlen));
    if (this.chck !== calculatedChecksum) {
      this.err = "Invalid packet: checksum does not match";
      console.error(this.err);
      console.log(calculatedChecksum);
    }
  }

}
ResponsePacket.prototype = Object.create(Packet.prototype);

module.exports = ResponsePacket;
