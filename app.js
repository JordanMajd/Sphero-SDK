'use strict';

// var NobleConnection = require('./lib/connection/noble-connection');
//
// var nobleConn = new NobleConnection();
// // nobleConn.startScan();
// //
// // setTimeout(function(){
// //   console.log('stopScan');
// //   nobleConn.stopScan();
// // },4000);
// nobleConn.connect('3ce5a3fa5fef4aeebe2c7858f8d8de25', function(){
//   console.log('ready');
// });


var Packet = require('./lib/packet/packet');
var myPacket = new Packet();
myPacket.createCommandPacket(0x01, 0x01, 0x52, undefined, true, true);

var testResponseBuffer = new Buffer(0x06);
var data = new Buffer(0x00);
testResponseBuffer.writeUInt8(0xFF, 0x00);
testResponseBuffer.writeUInt8(0xFF, 0x01);
testResponseBuffer.writeUInt8(0x00, 0x02);
testResponseBuffer.writeUInt8(0x00, 0x03);
testResponseBuffer.writeUInt8(data.length + 1, 0x04);
data.copy(testResponseBuffer, 0x05);
testResponseBuffer.writeUInt8(myPacket.computeCheckSum(testResponseBuffer), data.length + 0x05);

myPacket.readResponsePacket(testResponseBuffer);
