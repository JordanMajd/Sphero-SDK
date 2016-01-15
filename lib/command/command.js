'use strict';

//npm imports
const PromiseBB = require('bluebird');

//local imports
const CONTROL_SERVICE = require('../utility/services-list').CONTROL_SERVICE;
const commandResolver = require('../utility/command-resolver');

function Command(connection) {
  this.connection = connection;
}

Command.prototype.create = function(serviceId, characteristicId, data) {
  return new PromiseBB((resolve, reject) => {
    this.connection.writeCharectaristic(serviceId, characteristicId, data, (error) => {
      if (error) {
        reject(error);
      } else {
        commandResolver.addResolution(resolve);
      }
    });
  });
};

module.exports = Command;
