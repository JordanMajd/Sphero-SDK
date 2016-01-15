'use strict';

const Connection = require('./connection');
const noble = require('noble');
const PromiseBB = require('bluebird');

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
          //TODO: remove callback for promise
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
  console.log('sending:');
  console.log(data);
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
    if(err){
      console.error('Error setting notify:');
      console.error(err);
    }
  });
  characteristic.on('data', callback);
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

        //NOTE: testing code
        // this.readCharacteristic(service.uuid, characteristic.uuid, (err, data) => {
        //
        //   if (err) {
        //     console.log(err);
        //     cb(err);
        //   }
        //   if (data) {
        //     console.log(data.toString());
        //     cb(err);
        //   }
        //
        // });

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


module.exports = NobleConnection;
