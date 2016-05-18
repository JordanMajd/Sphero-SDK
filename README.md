# Sphero-SDK

WIP - This project is in early development and is not ready for use.

## About

This is a minimal, unopinionated library to control the Sphero BB8 using Javascript over Bluetooth LE.

This project is neither endorsed by Sphero nor Disney.

## Getting Started

First use [npm](https://www.npmjs.com/) to install the package:

```bash
npm install --save sphero-sdk
```

Then connect to a device and start issuing commands:

```javascript
'use strict';

var SpheroSDK = require('sphero-sdk');

// TODO Replace with your BB8's UUID
var myDevice = new SpheroSDK.BB8('3ce5a3fa5fef4aeebe2c7858f8d8de25');

myDevice.connection.connect()
  .then(function() {

    console.log('Connected to BB8.');

    // ensure dev mode is enabled
    return myDevice.command.setDevMode();
  })
  .then(function() {

    // start rolling forward
    return myDevice.command.roll(255, 0);
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

To test:

1. From the terminal, navigate into the repository's directory.
1. Run the tests with the command: `npm test`.

## Road Map

- Deploy to NPM
- Write tests.
- Create project site for docs, projects and examples.
- Create an examples repository.
- Add support for bots other than BB8.
- Add sequencing support to CommandResolver.
- Web Bluetooth API and browser packaging.

## License

This project uses an MIT license, for more details please view the [LICENSE](/LICENSE) included.
