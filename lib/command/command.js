'use strict';

//npm imports
const PromiseBB = require('bluebird');

function Command(connection){
  this.connection = connection;
}

Command.prototype.create = function(serviceId, characteristicId, data){
  return new PromiseBB( (resolve, reject) => {
    this.connection.writeCharectaristic(serviceId, characteristicId, data, (error) => {
      if(error){
        reject(error);
      }else{
        console.log('resolving command');
        resolve();
      }
    });
  });
};

module.exports = Command;
