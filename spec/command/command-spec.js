/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

describe('command', () => {

  let pingBB8;

  beforeEach((done) => {

    pingBB8 = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

    pingBB8.connection.connect().then(() => {
      done();
    });

  });

  afterEach(function(done) {

    pingBB8.connection.disconnect().then(() => {
      done();
    });

  });


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
});
