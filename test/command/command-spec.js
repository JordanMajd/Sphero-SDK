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

let testDevice = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

describe('command', commandSpec);

function commandSpec() {

  describe('listDevices', listDevicesSpec);
  describe('connect', connectSpec);
  describe('send', sendSpec);
  describe('disconnect', disconnectSpec);

}

function sendSpec() {

  it('sends packets to device', () => {

    let packet = new CommandPacket(CORE_API.DID_CORE, CORE_API.CMD_PING).packetBuffer;

    return testDevice.send(CONTROL_SERVICE.id, CONTROL_SERVICE.commandsCharacteristic, packet);

  });
}

function connectSpec() {

  it('connections with the device', () => testDevice.connect());
}

function disconnectSpec() {

  it('disconnects from the device', () =>  testDevice.disconnect());

}

function listDevicesSpec() {

  it('lists all bluetooth devices', () => {

    return testDevice.listDevices().then((list) => {
      console.log(list);
    });

  });
}
