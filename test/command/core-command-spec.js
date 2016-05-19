/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

let testDevice;

describe('CoreCommand', function() {

  this.timeout(10000);

  before(initDevice);

  // describe('ping', pingSpec);
  describe('setAutoReconnect', setAutoReconnectSpec);
  describe('getAutoReconnect', getAutoReconnectSpec);

  after(terminateDevice);

});


function pingSpec() {

  it('pings the device and the device responds', function(){
    return testDevice.ping();
  });
}

function setAutoReconnectSpec(){

  it('enables autoreconnect', function(){
    return testDevice.setAutoReconnect(true).then(function(packet){
      console.log(packet);
    });
  });

  xit('enables autoreconnect with timeout', function(){
    return testDevice.setAutoReconnect(true, 60);
  });

  xit('sets the device to not autoreconnect', function(){
    return testDevice.setAutoReconnect(false);
  });

}

function getAutoReconnectSpec(){

  xit('checks if autoreconnect is enabled', function(){
    return testDevice.getAutoReconnect();
  });

  xit('checks if autoreconnects after timeout', function(){
    return testDevice.getAutoReconnect();
  });

  it('checks if autoreconnect is disabled', function(){
    return testDevice.getAutoReconnect().then(function(packet){
      console.log(packet);
    });
  });

}

// connect to device for each test
function initDevice() {

  testDevice = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

  return testDevice.connect();
}

// disconnect from device after each test
function terminateDevice() {

  return testDevice.disconnect();

}
