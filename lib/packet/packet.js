'use strict';

function Packet() {

}

//SOP1 SOP2 DID CID SEQ DLEN CHK
Packet.prototype.createCommandPacket = function(did, cid, seq, data, requestAnswer, resetTimeout) {

  var sop2 = 0xFC | (resetTimeout && 0x02) | (requestAnswer && 0x01);
  data = data || new Buffer(0);

  var packetBuffer = new Buffer(data.length + 0x07);

  packetBuffer.writeUInt8(0xFF, 0x00);                    //SOP1
  packetBuffer.writeUInt8(sop2, 0x01);                    //SOP2
  packetBuffer.writeUInt8(did || 0x00, 0x02);             //DID
  packetBuffer.writeUInt8(cid || 0x00, 0x03);             //CID
  packetBuffer.writeUInt8(seq || 0x00, 0x04);             //SEQ
  packetBuffer.writeUInt8(data.length + 0x01, 0x05);      //DLEN
  data.copy(packetBuffer, 0x06);                          //DATA
  var checksum = this.computeCheckSum(packetBuffer);
  packetBuffer.writeUInt8(checksum, data.length + 0x06);  //CHCK

  return packetBuffer;
};

//SOP1 SOP2 MRSP SEQ DLEN CHK
Packet.prototype.readResponsePacket = function(responseBuffer) {
  var response = {};
  response.sop1 = responseBuffer.readUInt8(0x00);
  response.sop2 = responseBuffer.readUInt8(0x01);
  response.msrp = responseBuffer.readUInt8(0x02);
  response.seq = responseBuffer.readUInt8(0x03);
  response.dlen = responseBuffer.readUInt8(0x04);
  if(response.dlen > 1){
    response.data = responseBuffer.readUIntBE(0x05, response.dlen - 0x01);
  }
  var chck = responseBuffer.readUInt8(response.dlen + 0x04);

  var calculatedChecksum = this.computeCheckSum(responseBuffer.slice(0x00, 0x04 + response.dlen));
  if(chck !== calculatedChecksum){
    console.log('invalid checksum');
  }

  return response;
};

//sum of packet bytes (excluding SOP1, SOP2 & CHCK) mod 256
Packet.prototype.computeCheckSum = function(packetBuffer) {
  var byteSum = 0;

  //add up all the bytes after sop1 and sop2
  for (var i = 2; i < packetBuffer.length; i++) {
    byteSum += packetBuffer.readUInt8(i);
  }

  //bitwise modulo
  return byteSum & 0xFF;
};

module.exports = Packet;
