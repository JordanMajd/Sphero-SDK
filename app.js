'use strict';

var NobleConnection = require('./lib/connection/noble-connection');
var CommandPacket = require('./lib/packet/command-packet');
var api = require('./lib/api/api');
var servicesList = require('./lib/utility/services-list');

var nobleConn = new NobleConnection();

nobleConn.connect('3ce5a3fa5fef4aeebe2c7858f8d8de25', function(){
  console.log('ready');
  setTimeout(sendTestPacket, 4000);
  // sendTestPacket();
});


// var Packet = require('./lib/packet/packet');
// var myPacket = new Packet();
// myPacket.createCommandPacket(0x01, 0x01, 0x52, undefined, true, true);
//
// var testResponseBuffer = new Buffer(0x06);
// var data = new Buffer(0x00);
// testResponseBuffer.writeUInt8(0xFF, 0x00);
// testResponseBuffer.writeUInt8(0xFF, 0x01);
// testResponseBuffer.writeUInt8(0x00, 0x02);
// testResponseBuffer.writeUInt8(0x00, 0x03);
// testResponseBuffer.writeUInt8(data.length + 1, 0x04);
// data.copy(testResponseBuffer, 0x05);
// testResponseBuffer.writeUInt8(myPacket.computeCheckSum(testResponseBuffer), data.length + 0x05);
//
// myPacket.readResponsePacket(testResponseBuffer);

function sendTestPacket(){
  // var data = new Buffer(3);
  // data.writeUInt8(0xFF, 0x00);
  // data.writeUInt8(0xFF, 0x01);
  // data.writeUInt8(0xFF, 0x02);
  // var rollPacket = new CommandPacket(0x00, 0x11, 0x00, undefined, true, true);
  // nobleConn.writeCharectaristic('22bb746f2ba075542d6f726568705327', '22bb746f2ba175542d6f726568705327', rollPacket.packetBuffer,function(){
  // var testBuff = new Buffer(1);
  // testBuff.writeUInt8(0x01);
  // nobleConn.writeCharectaristic('22bb746f2bb075542d6f726568705327', '22bb746f2bbf75542d6f726568705327', testBuff,function(){
    // console.log('changed color');
  // });
}
