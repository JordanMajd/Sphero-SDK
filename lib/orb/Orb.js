'use strict';

//npm imports
let BlueBird = require('bluebird');

function Orb(uuid, Command, isBLE){

  var self = this;

  this.isReady = false;

  //add command libraries
  this.command = new Command();

  //detect type and connect to bluetooth
  let Connection;
  if(isBLE){
    Connection = require('../connection/noble-connection');
  }else{
    Connection = require('../connection/serial-connection');
  }
  this.connection = new Connection();

  this.connection.connect(uuid, function(){
    //antidos,
    // self.antiDOS()
    //tx,
    //wake
  });

  // return new BlueBird(function(resolve, reject){

  // });
}

Orb.prototype.init = function(){

};

//exports
module.exports = Orb;
