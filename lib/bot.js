'use strict';

/**
 * Constructor used to create and connect to a bot
 *
 * ### Examples:
 *
 *     var bb8 = Bot(Bot.models.bb8, Bot.connections.noble, Bot.controllers.dualshock);
 *
 * @param {String} The model of robot to connect to.
 * @param {String} The type ofconnection to establish communication with the robot.
 * @param {String}(optional) The type of controller to attach to the robot.
 * @return {Bot} A bot that allows you to connect and command the robot.
 * @api public
 */
var Bot = function(model, connection, controller){
  this.api = require(model);
  this.connection = require(connection);
  if(controller){
    this.controller = controller;
  }
};

Bot.models = {
  ollie:'./api/ollie-api',
  sphero:'./api/sphero-api',
  bb8:'./api/bb8-api'
};
Bot.registerModel = function(modelName, modelPath){
  this.models[modelName] = modelPath;
};

Bot.connections = {
  webbluetooth:'./connection/webbluetooth-connection',
  noble:'./connection/noble-connection',
  serial:'./connection/serial-connection'
};
Bot.registerConnection = function(connectionName, connectionPath){
  this.connections[connectionName] = connectionPath;
};

Bot.controllers = {
  dualshock:'./controller/dualshock-controller',
  xbox:'./controller/xbox-controller',
  keyboard:'./controller/keyboard-controller',
  mouse:'./controller/mouse-controller'
};
Bot.registerController = function(controllerName, controllerPath){
  this.controller[controllerName] = controllerPath;
};


module.exports = Bot;
