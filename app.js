'use strict';

//NOTE: maybe packets are corrupt
//NOTE: maybe I need to cache services and characteristics after I've awakened it.
//TODO: md5 is fuckd
const BB8 = require('./lib/orb/bb8-orb');

let myBB8 = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

myBB8.connection.connect()
  .then( () => {
    console.log('Connected to BB8.');
    return myBB8.command.setDevMode();
  })
  .then( () => {
    console.log('Dev mode enabled.');
  });
