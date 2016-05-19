/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

describe('command', () => {

  let pingBB8;

  beforeEach(doBeforeEach);

  afterEach(doAfterEach);

  describe('ping', pingSpec);

  // disconnect from device after each test
  function doAfterEach(done) {

    pingBB8.connection.disconnect().then(() => {
      done();
    });
  }

  // connect to device for each test
  function doBeforeEach(done) {

    pingBB8 = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

    pingBB8.connection.connect()
      .then(() => {
        return pingBB8.command.setDevMode();
      })
      .then(() => {
        done();
      });
  }

  function pingSpec() {

    it('pings the device and the device responds', (done) => {

      pingBB8.command.ping()
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
