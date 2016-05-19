/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

const BB8 = require('../../lib/sphero-sdk').BB8;

describe('command', function() {

  let pingBB8;

  beforeEach(function(done) {
    pingBB8 = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');
    pingBB8.connection.connect().then(function() {
      done();
    });
  });

  afterEach(function(done){
    pingBB8.connection.disconnect().then(function() {
      done();
    });
  });


  it('pings the device and the device responds', function(done) {

    pingBB8.command.ping()
      .then(function() {
        expect(true).toBe(true);
        done();
      })
      .catch(function() {
        expect(true).toBe(false);
        done();
      });

  });
});
