/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

describe('command', () => {

  let testDevice;

  beforeEach(doBeforeEach);

  afterEach(doAfterEach);

  describe('ping', ping);

  // disconnect from device after each test
  function doAfterEach(done) {

    testDevice.disconnect().then(() => {
      done();
    });
  }

  // connect to device for each test
  function doBeforeEach(done) {

    testDevice = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

    testDevice.connect()
      .then(() => {
        return testDevice.setDevMode();
      })
      .then(() => {
        done();
      });
  }

  function ping() {

    it('pings the device and the device responds', (done) => {

      testDevice.ping()
        .then(() => {
          expect(true).toBe(true);
          done();
        })
        .catch(() => {
          expect(true).toBe(false);
          done();
        });
    });
  }

});
