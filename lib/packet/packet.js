/**
 * # packet.js
 *
 * This file is responsible for creating, reading and managing valid sphero
 * packets.
 *
 * @author Jordan Majd <jordan@madtitanstudios.com>
 * @version 0.0.1
 */

'use strict';

/**
 * Packet Constructor. Should not be instantiated, instead should be inherited
 * from. Packets are used by Connection objects, packets are written to devices
 * and read from devices in order to communicate.
 *
 * ### Examples:
 *
 *     function CommandPacket(...){
 *        Packet.call(this);
 *
 * @api public
 */
function Packet() {

}

/**
 * Calculates a checksum for the packet. Checksum is computed in two steps.
 * First, all the fields in the packet are summed, excluding SOP1, SOP2 and
 * CHCK. Next, the summation is modulod by 256.
 *
 * ### Examples:
 *
 *     this.CHCK = this.computeCheckSum(packetBuffer);
 *
 * @param {Buffer} packetBuffer a valid Packet buffer.
 * @return {Number} checksum value of packetBuffer.
 * @api public
 */
Packet.prototype.computeCheckSum = function(packetBuffer) {
  var byteSum = 0;

  // sum all the bytes after SOP1 and SOP2
  for (var i = 2; i < packetBuffer.length; i++) {
    byteSum += packetBuffer.readUInt8(i);
  }

  //bytesum modulo 256 = bytSum & 0xFF
  return byteSum & 0xFF;
};

module.exports = Packet;
