'use strict';

var Connection = require('./connection');

function NobleConnection(){
  //invoke super constructor
  Connection.call(this);

  this.noble = require('noble');

  this.peripheral = null;

  this.servicesCache = {};
}

NobleConnection.prototype = Object.create(Connection.prototype);


//TODO: duration?
NobleConnection.prototype.startScan = function(onDiscover, callback){

  if(callback){
    this.noble.on('scanStart', callback);
  }else{
    this.noble.on('scanStart', function(){});
  }

  if(onDiscover){
    this.noble.on('discover', onDiscover.bind(this));
  }else{
    this.noble.on('discover', function(peripheral){
      console.log('===');
      if(peripheral.advertisement && peripheral.advertisement.localName){
        console.log('Friendly Name: ' + peripheral.advertisement.localName);
      }
      console.log('UUID: ' + peripheral.id);
    });
  }

  this.noble.on('stateChange', function(state){
    if(state === 'poweredOn'){
      this.noble.startScanning([], false);
    }else{
      this.stopScan();
    }
  }.bind(this));

};

NobleConnection.prototype.stopScan = function(callback) {

  if(callback){
    this.noble.on('scanStop', callback);
  }else{
    this.noble.on('scanStop', function(){});
  }

  this.noble.stopScanning();
};

NobleConnection.prototype.connect = function(uuid, callback) {
  this.startScan(
    function(peripheral){
      if(peripheral.uuid === uuid){
        console.log('Device found, attempting to connect...');

        this.peripheral = peripheral;
        this.peripheral.on('connect', this.cacheServicesAndCharactaristics.bind(this, callback));
        this.peripheral.connect();
        this.stopScan();
      }
    }.bind(this),
    function(){
      console.log('Scanning for device: ' + uuid);
    }.bind(this)
  );
};

NobleConnection.prototype.disconnect = function(callback) {

  console.log('Disconnecting from device...');

  if(callback){
    this.peripheral.on('disconnect', callback);
  }

  this.peripheral.disconnect(callback);
  this.peripheral = null;
};

NobleConnection.prototype.cacheServicesAndCharactaristics = function(callback){
  console.log('connected, initializing device...');
  this.peripheral.discoverAllServicesAndCharacteristics(function(error, services){

    if(error){
      console.error(error);
    }
    // services.forEach(function(service){
    //   console.log(service);
    // });

    var self = this;
    services.forEach(function(service){
      self.servicesCache[service.uuid] = service;
      service.characteristics.forEach(function(characteristic){
        self.servicesCache[service.uuid][characteristic.uuid] = characteristic;
      });
    });
    // services.forEach(function(service, sIndex){
    //   // if(service.uuid === '22bb746f2ba075542d6f726568705327'){
    //   //     console.log(service);
    //   // }
    //   // console.log(service.uuid);
    //   console.log((service.name || ('service' + sIndex)) + ':\'' + service.uuid + '\':{');
    //   service.characteristics.forEach(function(characteristic, cIndex){
    //     console.log((characteristic.name || ('characteristic' + cIndex)) + ':\'' + characteristic.uuid + '\',');
    //   });
    //   console.log('},');
    // });

    // characteristics.forEach(function(characteristic, index){
    //   console.log((characteristic.name || ('unknown' + index)) + ':\'' + characteristic.uuid + '\',');
    // });

      // this.readCharacteristic('22bb746f2ba075542d6f726568705327', '22bb746f2ba175542d6f726568705327', function(err, data){
      //   if(err){
      //     console.log(err);
      //   }
      //   console.log(data.toString());
      // }.bind(this));
      //
      // this.writeCharectaristic('22bb746f2bb075542d6f726568705327', '22bb746f2bbf75542d6f726568705327', 1, function(err){
      //   if(err){
      //     console.log(err);
      //   }
      //   console.log('woke processor');
      // }.bind(this));
      callback();

  }.bind(this));
};

NobleConnection.prototype.writeCharectaristic = function(serviceId, characteristicId, value, callback){
  var characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.write(new Buffer(value), true, callback);
};

NobleConnection.prototype.readCharacteristic = function(serviceId, characteristicId, callback){
  var characteristic = this.servicesCache[serviceId][characteristicId];
  characteristic.read(callback);
};

module.exports = NobleConnection;
