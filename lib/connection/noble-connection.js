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

// scan for 15 seconds and return list of devices.
NobleConnection.prototype.listDevices = function() {

  return new PromiseBB((resolve /*, reject */ ) => {

    let timeoutSec = 5;
    let list = [];

    this.startScan(function(peripheral) {

      let mappedPeripheral = {
        uuid: peripheral.uuid,
        rssi: peripheral.rssi,
        connectable: peripheral.connectable,
        state: peripheral.state,
        advertisement: {
          localName: peripheral.advertisement.localName,
          txPowerLevel: peripheral.advertisement.txPowerLevel
        }
      };

      list.push(mappedPeripheral);
    });

    setTimeout(function() {
      noble.stopScanning();
      resolve(list);
    }, timeoutSec * 1000);

  });
};

/**
 * Attempts to connect to device with `this.uuid`. If successful sets device to
 * `this.peripheral`.
 *
 * @return {Promise}
 * @public
 */

NobleConnection.prototype.connect = function() {

  return new PromiseBB((resolve, reject) => {

    this.startScan((peripheral) => {

      if (peripheral.uuid === this.uuid) {

        noble.stopScanning();

        this.peripheral = peripheral;

        this.peripheral.connect((connectionError) => {

          if (connectionError) {
            reject(connectionError);
          } else {
            this.cacheServicesAndCharactaristics((cacheError) => {
              if (cacheError) {
                reject(cacheError);
              } else {
                resolve();
              }
            });
          }
        });
      }
    });
  });
};


/**
 * Attempts to disconnect from `this.peripheral` and set it to null.
 *
 * @return {Promise}
 * @public
 */

NobleConnection.prototype.disconnect = function() {

  return new PromiseBB((resolve, reject) => {

    this.peripheral.disconnect((error) => {
      if (error) {
        reject(error);
      } else {
        this.peripheral = null;
        resolve();
      }
    });

  });
};

NobleConnection.prototype.writeCharactaristic = function(serviceId, characteristicId, data, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  console.log('SENDING: ', data);
  characteristic.write(data, true, callback);
};

NobleConnection.prototype.readCharacteristic = function(serviceId, characteristicId, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.read(callback);
};

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


NobleConnection.prototype.startScan = function(cb) {

  // when device is discovered resolve
  noble.on('discover', (peripheral) => {
    cb(peripheral);
  });

  // start looking for device if bluetooth is powered on
  // otherwise wait for power on to start scanning
  if(noble.state === 'poweredOn'){

    noble.startScanning([], false);

  } else {
    noble.on('stateChange', (state) => {
      if (state === 'poweredOn') {

        noble.startScanning([], false);

      } else {
        noble.stopScanning();
      }
    });
  }

};
