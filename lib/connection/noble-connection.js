'use strict';

const Connection = require('./connection');
const noble = require('noble');
const PromiseBB = require('bluebird');

function NobleConnection() {

  //invoke super constructor
  Connection.call(this);

  this.peripheral = null;

  this.servicesCache = {};
}
NobleConnection.prototype = Object.create(Connection.prototype);

NobleConnection.prototype.connect = (uuid) => {

  return new PromiseBB( (resolve) => {

    this.startScan()
      .then( (peripheral) => {

        if (peripheral.uuid === uuid) {

          this.peripheral = peripheral;

          this.peripheral.on('connect', () => {
            this.cacheServicesAndCharactaristics();
            resolve();
          });

          this.peripheral.connect();
          noble.stopScanning();
        }
      });
  });
};

NobleConnection.prototype.disconnect = () => {
  return new PromiseBB( (resolve) =>{
    this.peripheral.disconnect( () => {
        this.peripheral = null;
        resolve();
    });
  });
};

NobleConnection.prototype.writeCharectaristic = function(serviceId, characteristicId, data, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.write(data, true, callback);
};

NobleConnection.prototype.readCharacteristic = function(serviceId, characteristicId, callback) {
  let characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.read(callback);
};


NobleConnection.prototype.cacheServicesAndCharactaristics = () => {

  this.peripheral.discoverAllServicesAndCharacteristics( (error, services) => {

    if (error) {
      console.error(error);
    }

    services.forEach(service => {

      this.servicesCache[service.uuid] = service;

      service.characteristics.forEach( (characteristic) => {

        this.servicesCache[service.uuid][characteristic.uuid] = characteristic;

        //NOTE: testing code
        this.readCharacteristic(service.uuid, characteristic.uuid, (err, data) => {

          if (err) {
            console.log(err);
          }
          if (data) {
            console.log(data.toString());
          }
        });

      });
    });
  });
};


NobleConnection.prototype.startScan = () => {

  return new PromiseBB( (resolve, reject) =>{
    //start looking for device if bluetooth is enabled
    //otherwise tell user to enable bluetooth
    noble.on('stateChange', (state) => {
      if (state === 'poweredOn') {
        noble.startScanning([], false);
      } else {
        noble.stopScanning();
        reject(new Error('Bluetooth not enabled.'));
      }
    });

    //when device is discovered resolve
    //TODO promise gets fulfilled after one device
    noble.on('discover', (peripheral) => {
      resolve(peripheral);
    });
  });
};


module.exports = NobleConnection;
