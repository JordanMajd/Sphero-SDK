/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

let testDevice;

describe('CoreCommands', () => {

  beforeEach(initDevice);
  afterEach(terminateDevice);

  describe('ping', pingSpec);

});


function pingSpec() {

  it('pings the device and the device responds', () => testDevice.ping());

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
