/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;
const CommandPacket = require('../../lib/packet/command-packet');
const CORE_API = require('../../lib/utility/api').CORE_API;
const CONTROL_SERVICE = require('../../lib/utility/services').CONTROL_SERVICE;
const assert = require('chai').assert;

let testDevice = new BB8('f0c66751cc7f');

describe('Command',function () {

  this.timeout(10000);

  describe('listDevices', listDevicesSpec);
  describe('connect', connectSpec);
  describe('send', sendSpec);
  describe('disconnect', disconnectSpec);

});

function sendSpec() {

  it('sends packets to device', function() {

    let packet = new CommandPacket(CORE_API.DID_CORE, CORE_API.CMD_PING).packetBuffer;

    return testDevice.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);

  });
}

function connectSpec() {

  it('connects to the device', function() {

    return testDevice.connect();
  });
}

function disconnectSpec() {

  it('disconnects from the device', function() {

    return testDevice.disconnect();
  });
}

function listDevicesSpec() {

  it('lists all bluetooth devices', function() {

    this.timeout(5050);

    return testDevice.listDevices().then(function(list) {
      assert(list.length > 0);
    });
  });
}
