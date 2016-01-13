'use strict';

const CoreCommand = require('./core-command');

function SpheroCommand(connection){
  CoreCommand.call(this, connection);
}
SpheroCommand.prototype = Object.create(CoreCommand.prototype);

module.exports = SpheroCommand;
