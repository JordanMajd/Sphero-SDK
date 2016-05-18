# BB8-SDK

WIP - not ready for use yet.

## About

This is a minimal, unopinionated library to control the Sphero BB8 using Javascript over Bluetooth LE.

This project was started out of a desire to learn and an impulse to hack everything I own. Initially, I started using libraries that other people had written but I had a desire to have a deeper understanding. The solution, was to write my own library to control the BB8. This has been healthy, I've learned a lot about Bluetooth LE and has inspired me to use it in other projects.

## Getting Started

First use [npm](https://www.npmjs.com/) to install the package:

```bash
npm install --save bb8-sdk
```

Then start programming the BB8:

```javascript
'use strict';

var BB8 = require('bb8-sdk');

// TODO Replace with your BB8's UUID
var myBB8 = new BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

myBB8.connection.connect()
  .then(function() {

    console.log('Connected to BB8.');

    // ensure dev mode is enabled
    return myBB8.command.setDevMode();
  })
  .then(function() {

    // start rolling forward
    return myBB8.command.roll(255, 0);
  })
  .then(function() {
    console.log('We are rolling!');
  })
  .catch(function(err){
    console.error(Something went wrong!);
  });
```

## Building from Source

Before starting ensure:

- [node.js](https://nodejs.org/en/) installed and configured.
- Your device has Bluetooth LE support.

To build:

1. Clone the repository.
1. From the terminal, navigate into the repository's directory.
1. Install NPM dependencies by running: `npm install`.

## Road Map

- Create documentation repo.
- Create an example repository.
- Add sequencing support to CommandResolver.
- Web Bluetooth API and browser packaging.

## License

This project uses an MIT license, for more details please view the [LICENSE](/LICENSE) included.
