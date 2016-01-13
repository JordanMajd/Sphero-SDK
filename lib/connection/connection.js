'use strict';

function Connection() {
  // console.error('interface not implemented');
}

/* General */

Connection.prototype.startScan = () => {
  console.error('interface not implemented');
};

Connection.prototype.stopScan = () => {
  console.error('interface not implemented');
};

Connection.prototype.connect = () => {
  console.error('interface not implemented');
};

Connection.prototype.disconnect = () => {
  console.error('interface not implemented');
};

/* Service */

Connection.prototype.getService = () => {
  console.error('interface not implemented');
};

Connection.prototype.getServices = () => {
  console.error('interface not implemented');
};

Connection.prototype.getIncludedServices = () => {
  console.error('interface not implemented');
};

/* Characteristics */

Connection.prototype.getCharacteristic = () => {
  console.error('interface not implemented');
};

Connection.prototype.getCharacteristics = () => {
  console.error('interface not implemented');
};

Connection.prototype.writeCharacteristicValue = () => {
  console.error('interface not implemented');
};

Connection.prototype.readCharacteristicValue = () => {
  console.error('interface not implemented');
};

Connection.prototype.startCharacteristicNotifications = () => {
  console.error('interface not implemented');
};

Connection.prototype.stopCharacteristicNotifications = () => {
  console.error('interface not implemented');
};

/* DESCRIPTORS */

Connection.getDescriptor = () => {
  console.error('interface not implemented');
};

Connection.prototype.getDescriptors = () => {
  console.error('interface not implemented');
};


Connection.prototype.readDescriptorValue = () => {
  console.error('interface not implemented');
};

Connection.prototype.writeDescriptorValue = () => {
  console.error('interface not implemented');
};

/* EVENTS */
Connection.prototype.onDiscover = () => {
  console.error('interface not implemented');
};

Connection.prototype.onWarning = () => {
  console.error('interface not implemented');
};

Connection.prototype.onConnect = () => {
  console.error('interface not implemented');
};

Connection.prototype.onDisconnect = () => {
  console.error('interface not implemented');
};

Connection.prototype.servicesDiscovered = () => {
  console.error('interface not implemented');
};

Connection.prototype.onIncludedServicesDiscovered = () => {
  console.error('interface not implemented');
};

Connection.prototype.onCharacteristicDiscovered = () => {
  console.error('interface not implemented');
};

Connection.prototype.onData = () => {
  console.error('interface not implemented');
};

Connection.prototype.onRead = () => {
  console.error('interface not implemented');
};

Connection.prototype.onWrite = () => {
  console.error('interface not implemented');
};

Connection.prototype.onBroadcast = () => {
  console.error('interface not implemented');
};

Connection.prototype.onNotify = () => {
  console.error('interface not implemented');
};
module.exports = Connection;
