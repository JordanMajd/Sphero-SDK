'use strict';

var NobleConnection = require('./lib/connection/noble-connection');

var nobleConn = new NobleConnection();
// nobleConn.startScan();
//
// setTimeout(function(){
//   console.log('stopScan');
//   nobleConn.stopScan();
// },4000);
nobleConn.connect('3ce5a3fa5fef4aeebe2c7858f8d8de25', function(){
  console.log('ready');
});
