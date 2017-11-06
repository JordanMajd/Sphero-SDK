/*!
 * sphero-sdk
 * Copyright(c) 2015-2017 Jordan Majd
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
  this.deviceList = [];

  this.isScanning = false;
  this.isConnecting = false;

  this.resolveCon = null;
  this.rejectCon = null;

  noble.on('stateChange', onStateChange.bind(this));
  noble.on('discover', onDiscover.bind(this));
}
NobleConnection.prototype = Object.create(Connection.prototype);


// private
function onDiscover (peripheral){

  if(this.isConnecting && peripheral.uuid === this.uuid){
    connectToDevice.call(this, peripheral);
  }

  if(this.isScanning){
    listDevice.call(this, peripheral);
  }
}

// private
function onStateChange (state){
  if (state === 'poweredOn' && this.isScanning) {
    noble.startScanning([], false);
  } else {
    noble.stopScanning();
  }
}

// private
function connectToDevice (peripheral){

  noble.stopScanning();
  this.isConnecting = false;
  this.peripheral = peripheral;

  this.peripheral.connect((connectionError) => {

    if (connectionError) {
      this.rejectConnection(connectionError);
    } else {
      this.cacheServicesAndCharactaristics();
    }
  });
}

// private
function listDevice (peripheral, list){

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

  this.deviceList.push(mappedPeripheral);
}


NobleConnection.prototype.listDevices = function(timeout) {

  return new PromiseBB((resolve /*, reject */ ) => {

    this.deviceList = [];

    if(timeout === undefined){
      timeout = 5;
    }

    this.isScanning = true;
    this.startScan();

    setTimeout(()=> {
      this.isScanning = false;
      noble.stopScanning();
      resolve(this.deviceList);
    }, timeout * 1000);
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
    this.isConnecting = true;
    this.resolveConnection = resolve;
    this.rejectConnection = reject;
    this.startScan();
  });
}


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
    characteristic.once('data', callback);
  });
};

NobleConnection.prototype.cacheServicesAndCharactaristics = function() {

  this.peripheral.discoverAllServicesAndCharacteristics((error, services) => {

    if (error) {
      this.rejectConnection(error);
    }

    services.forEach(service => {

      this.servicesCache[service.uuid] = service;

      service.characteristics.forEach((characteristic) => {

        this.servicesCache[service.uuid][characteristic.uuid] = characteristic;

      });
    });

    this.resolveConnection();

  });
};


NobleConnection.prototype.startScan = function() {

  // start looking for device if bluetooth is powered on
  // otherwise wait for power on to start scanning
  if(noble.state === 'poweredOn'){

    noble.startScanning([], false);

  }
};
