'use strict';

var Packet = require('./packet');

function CommandPacket(did, cid, seq, data, answer, timeout){

  Packet.call(this);

  //start of packet 1, always 0xFF
  this.sop1 = 0xFF;

  //start of packet 2, 0xF8 to 0xFFH encoding 4 bits of per-message options
  //bits 1111 1 1 resetTimeout, answer
  //when answer 1, act and reply, when 0 act and don't reply
  //when resetTimeout 1 reset client inactivity timeout, when 0 do not reset
  this.sop2 = 0xFC | (timeout && 0x02) | (answer && 0x01);

  //device id, the virtual devices this packet is intended for
  this.did = did || 0x00;

  //command id, the command code
  this.cid = cid || 0x00;

  //sequence number, this client field is echoed in the response for all synchronous commands(and ignored by sphero when sop2 has bit 0 clear)
  this.seq = seq || 0x00;

  //data, optional data to accompany the command
  this.data = data || new Buffer(0);

  //data length, the number of bytes following through the end of the packet
  //(+0x01 is to include checksum byte)
  this.dlen = this.data.length + 0x01;

  //buffer equal to min packet size and length of data
  var buffer = new Buffer(this.data.length + 7);
  buffer.writeUInt8(this.sop1, 0);
  buffer.writeUInt8(this.sop2, 1);
  buffer.writeUInt8(this.did, 2);
  buffer.writeUInt8(this.cid, 3);
  buffer.writeUInt8(this.seq, 4);
  buffer.writeUInt8(this.dlen, 5);
  this.data.copy(buffer, 6);

  //checksum
  this.chck = this.computeCheckSum(buffer);

  buffer.writeUInt8(this.chck, this.data.length + 6);

  return buffer;
}
CommandPacket.prototype = Object.create(Packet.prototype);

//sum of underlined bytes mod 256
CommandPacket.prototype.computeCheckSum = function(buffer){
  var byteSum = 0;

  //add up all the bytes after sop1 and sop2
  for(var i = 2; i < buffer.length; i++){
    byteSum += buffer.readUInt8(i);
  }

  //bitwise modulo
  return byteSum & 0xFF;
};

module.exports = CommandPacket;
