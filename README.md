# Sphero-SDK

:warning: This project is in early development and is not ready for use. :warning:

## About

A minimal, unopinionated library to control Sphero, BB8 and Ollie using Javascript over Bluetooth.

> Disclaimer: This project is neither endorsed by Sphero nor Disney

#### Supported Devices:

- BB8 (partial support, development in progress)
- Ollie (partial support, development in progress)
- Sphero (planned support)
- Sphero SPRK (planned support)

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

myDevice.connect()
  .then(function() {
    // start rolling forward
    return myDevice.roll(255, 0);
  })
  .then(function() {
    // keep rolling for 1 second
    return myDevice.wait(1000);
  })
  .then(function() {
    // stop rolling
    return myDevice.stop();
  })
  .then(function() {
    // disconnect from device
    return myDevice.disconnect();
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

## Project Road Map

- Deploy to NPM
  - add downloads badge.
  - add version badge.
- Add support for:
  - Sphero
  - Sphero SPRK
  - Ollie
- Create project site for docs, projects and examples.
- Setup Travis CI for unit testing builds.
  - add build status badge.
- Setup Coverall.
  - add test coverage badge.
- Add event driven support to listen for async messages from devices.
- Add sequencing support to CommandResolver.
- Add support for multi-responses to hold large data.
- Add Web Bluetooth support and browser packaging.

## License

This project uses an MIT license, for more details please view the [LICENSE](/LICENSE) included.
