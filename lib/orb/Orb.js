'use strict';

function Orb(uuid, Command, isBLE){

  this.uuid = uuid;

  //instantiate and assign command object
  this.command = new Command();

  //detect type and connect to bluetooth
  let Connection;
  if(isBLE){
    Connection = require('../connection/noble-connection');
  }else{
    Connection = require('../connection/serial-connection');
  }
  //instantiate and assign connection object
  this.connection = new Connection(this.uuid);
}

//exports
module.exports = Orb;
