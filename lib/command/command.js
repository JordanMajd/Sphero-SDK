/*!
 * bb8-sdk
 * Copyright(c) 2015-2016 Jordan Majd
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const PromiseBB = require('bluebird');
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
