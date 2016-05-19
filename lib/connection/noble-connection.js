/*!
 * sphero-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const Connection = require('./connection');
const noble = require('noble');
const PromiseBB = require('bluebird');

/**
 * Module exports.
 * @public
 */

module.exports = NobleConnection;

function NobleConnection(uuid) {

  //invoke super constructor
  Connection.call(this, uuid);

  this.peripheral = null;

  this.servicesCache = {};
}
NobleConnection.prototype = Object.create(Connection.prototype);

NobleConnection.prototype.connect = function() {

  return new PromiseBB((resolve, reject) => {
    
    this.startScan((peripheral) => {

      if (peripheral.uuid === this.uuid) {

        this.peripheral = peripheral;

        this.peripheral.on('connect', () => {

          this.cacheServicesAndCharactaristics((error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });

        this.peripheral.connect();
        noble.stopScanning();
      }

    });
  });
};

NobleConnection.prototype.disconnect = function() {
  return new PromiseBB((resolve) => {
    this.peripheral.disconnect(() => {
      this.peripheral = null;
      resolve();
    });
  });
};

//TODO promisify
NobleConnection.prototype.writeCharectaristic = function(serviceId, characteristicId, data, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  console.log('SENDING: ', data);
  characteristic.write(data, true, callback);
};

//TODO promisify
NobleConnection.prototype.readCharacteristic = function(serviceId, characteristicId, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.read(callback);
};

//TODO promisify
NobleConnection.prototype.notifyCharacteristic = function(serviceId, characteristicId, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.notify(true, (err) => {
    if (err) {
      console.error('Error setting notify:');
      console.error(err);
    }
    console.log('LISTENING');
    characteristic.on('data', callback);
  });
};

//TODO promisify
NobleConnection.prototype.cacheServicesAndCharactaristics = function(cb) {

  this.peripheral.discoverAllServicesAndCharacteristics((error, services) => {

    if (error) {
      console.error(error);
    }

    services.forEach(service => {

      this.servicesCache[service.uuid] = service;

      service.characteristics.forEach((characteristic) => {

        this.servicesCache[service.uuid][characteristic.uuid] = characteristic;

      });
    });

    cb();

  });
};

//TODO promisify
NobleConnection.prototype.startScan = function(cb) {

  //start looking for device if bluetooth is enabled
  //otherwise tell user to enable bluetooth
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      noble.startScanning([], false);
    } else {
      noble.stopScanning();
    }
  });

  //when device is discovered resolve
  noble.on('discover', (peripheral) => {
    cb(peripheral);
  });
};
