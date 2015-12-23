'use strict';

var noble = require('noble');
var Connection = require('./connection');


var NobleConnection = function(){
  Connection.call(this);
};
NobleConnection.prototype = Object.create(Connection.prototype);

NobleConnection.prototype.startScan = function(callback){

};

module.exports = NobleConnection;
