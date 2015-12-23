'use strict';

function Connection() {
  // console.error('interface not implemented');
}

/* General */

Connection.prototype.startScan = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.stopScan = function() {
  console.error('interface not implemented');
};

Connection.prototype.connect = function() {
  console.error('interface not implemented');
};

Connection.prototype.disconnect = function() {
  console.error('interface not implemented');
};

/* Service */

Connection.prototype.getService = function() {
  console.error('interface not implemented');
};

Connection.prototype.getServices = function() {
  console.error('interface not implemented');
};

Connection.prototype.getIncludedServices = function() {
  console.error('interface not implemented');
};

/* Characteristics */

Connection.prototype.getCharacteristic = function() {
  console.error('interface not implemented');
};

Connection.prototype.getCharacteristics = function() {
  console.error('interface not implemented');
};

Connection.prototype.writeCharacteristicValue = function() {
  console.error('interface not implemented');
};

Connection.prototype.readCharacteristicValue = function() {
  console.error('interface not implemented');
};

Connection.prototype.startCharacteristicNotifications = function() {
  console.error('interface not implemented');
};

Connection.prototype.stopCharacteristicNotifications = function() {
  console.error('interface not implemented');
};

/* DESCRIPTORS */

Connection.getDescriptor = function() {
  console.error('interface not implemented');
};

Connection.prototype.getDescriptors = function() {
  console.error('interface not implemented');
};


Connection.prototype.readDescriptorValue = function() {
  console.error('interface not implemented');
};

Connection.prototype.writeDescriptorValue = function() {
  console.error('interface not implemented');
};

/* EVENTS */
Connection.prototype.onDiscover = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onWarning = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onConnect = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onDisconnect = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.servicesDiscovered = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onIncludedServicesDiscovered = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onCharacteristicDiscovered = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onData = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onRead = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onWrite = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onBroadcast = function(callback) {
  console.error('interface not implemented');
};

Connection.prototype.onNotify = function(callback) {
  console.error('interface not implemented');
};
module.exports = Connection;
