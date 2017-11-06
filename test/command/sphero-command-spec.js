/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';


const PromiseBB = require('bluebird');
const BB8 = require('../../lib/sphero-sdk').BB8;
const assert = require('chai').assert;

let testDevice;

describe('SpheroCommand', function() {

  this.timeout(10000);

  before(initDevice);

  describe('setCalibration', setCalibrationSpec);
  describe('setStabilize', setStabilizeSpec);
  describe('setBackLED', setBackLEDSpec);
  describe('roll', rollSpec);

  after(terminateDevice);

});

function setCalibrationSpec() {
  it('sets calibration heading', function() {
    return testDevice.setCalibration(180).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });
}

function setStabilizeSpec() {
  it('enables stabilization.', function() {
    return testDevice.setStabilize(true).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });

  it('disables stabilization.', function() {
    return testDevice.setStabilize(false).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });
}

function setBackLEDSpec(){
  it('enables back led.', function() {
    return testDevice.setBackLED(255).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });

  it('disables back led.', function() {
    return testDevice.setBackLED(0).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });
}

function rollSpec(){
  it('starts rolling.', function() {
    return testDevice.roll(255, 0).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });

  it('stops rolling.', function() {
    return testDevice.roll(255, 0).then(function(packet) {
      assert(packet.msrp === 0x00, 'Successful response.');
      assert(packet.dlen === 0x01, 'Correct response length.');
    });
  });
}


// connect to device for each test
function initDevice(done) {

  testDevice = new BB8('f0c66751cc7f');
  return testDevice.connect();

}

// disconnect from device after each test
function terminateDevice() {

  return testDevice.disconnect();

}
