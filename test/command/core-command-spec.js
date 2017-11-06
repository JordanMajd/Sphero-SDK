/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;
const assert = require('chai').assert;

let testDevice;

describe('CoreCommand', function() {

  this.timeout(10000);

  before(initDevice);

  describe('ping', pingSpec);
  describe('getVersion', getVersionSpec);
  // describe('setBluetoothName', setBluetoothNameSpec);
  // describe('getBluetoothInfo', getBluetoothInfoSpec);
  // either set or get isnt working
  describe('setAutoReconnect', setAutoReconnectSpec);
  describe('getAutoReconnect', getAutoReconnectSpec);

  after(terminateDevice);

});


function pingSpec() {

  it('pings the device and the device responds', function(){
    return testDevice.ping().then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
    });
  });
}

function getVersionSpec(){

  it('requests the device\'s version information', function(){
    return testDevice.getVersion().then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
    });
  });
}

function setBluetoothNameSpec(){
    //TODO
}

function getBluetoothInfoSpec(){
  it('requests the device\'s bluetooth information', function(){
    return testDevice.getBluetoothInfo().then(function(packet){
      console.log(packet);
      //TODO handle packets who are split into two
      assert(packet.msrp === 0x00, 'Successful response.');
    });
  });
}

function setAutoReconnectSpec(){

  it('enables autoreconnect', function(){
    return testDevice.setAutoReconnect(true).then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });


  it('enables autoreconnect with timeout', function(){
    return testDevice.setAutoReconnect(true, 60).then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });


  it('disables autoreconnect', function(){
    return testDevice.setAutoReconnect(false).then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });
}

function getAutoReconnectSpec(){
  it('requests autoreconnect information', function(){
    return testDevice.getAutoReconnect().then(function(packet){
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x03, 'Correct response length.');
    });
  });
}


// connect to device for each test
function initDevice() {

  testDevice = new BB8('f0c66751cc7f');

  return testDevice.connect();
}

// disconnect from device after each test
function terminateDevice() {

  return testDevice.disconnect();

}
