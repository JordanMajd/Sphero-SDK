'use strict';

var Packet = require('./packet');

/**
 * Response Packet Constructor. Response Packets are sent from devices over
 * bluetooth.
 *
 * ### Examples:
 *
 *    var command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);
 *
 * @param {Buffer} responseBuffer: this is a buffer filled with the response packet data.imer since it last received a command.
 * @return {Object} Returns an parsed version of the buffer as an object.
 * @api public
 */
function ResponsePacket(responseBuffer){

    Packet.call(this);

    //SOP1 SOP2 MRSP SEQ DLEN CHK
    this.sop1 = responseBuffer.readUInt8(0x00);
    this.sop2 = responseBuffer.readUInt8(0x01);
    this.msrp = responseBuffer.readUInt8(0x02);
    this.seq = responseBuffer.readUInt8(0x03);
    this.dlen = responseBuffer.readUInt8(0x04);
    if(this.dlen > 1){
      this.data = responseBuffer.readUIntBE(0x05, this.dlen - 0x01);
    }
    this.chck = responseBuffer.readUInt8(this.dlen + 0x04);

    //validate checksum
    var calculatedChecksum = this.computeCheckSum(responseBuffer.slice(0x00, 0x04 + this.dlen));
    if(this.chck !== calculatedChecksum){
      this.err = "Invalid packet: checksum does not match";
      console.error(this.err);
    }
}
ResponsePacket.prototype = Object.create(Packet.prototype);

module.exports = ResponsePacket;
