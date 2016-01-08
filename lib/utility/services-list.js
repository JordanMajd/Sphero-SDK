'use strict';


const CONTROL_SERVICE = { // Ollie Robot Control Service
  id: '22bb746f2ba075542d6f726568705327',
  characteristics: {
    commandsCharacteristic: '22bb746f2ba175542d6f726568705327', // Roll
    responseCharacteristic: '22bb746f2ba675542d6f726568705327' // Notify
  }
};

const BLUE_SERVICE = { // Ollie BLE Service
  id: '22bb746f2bb075542d6f726568705327',
  characteristics: {
    characteristic0: '22bb746f2bb175542d6f726568705327',
    txPowerCharacteristic: '22bb746f2bb275542d6f726568705327', // TX Power
    characteristic2: '22bb746f2bb675542d6f726568705327',
    characteristic3: '22bb746f2bb775542d6f726568705327',
    characteristic4: '22bb746f2bb875542d6f726568705327',
    characteristic5: '22bb746f2bb975542d6f726568705327',
    characteristic6: '22bb746f2bba75542d6f726568705327',
    antiDosCharacteristic: '22bb746f2bbd75542d6f726568705327', // Anti DOS
    characteristic8: '22bb746f2bbe75542d6f726568705327',
    wakeCharacteristic: '22bb746f2bbf75542d6f726568705327', // Wake Main Processor
    characteristic10: '22bb746f3bba75542d6f726568705327'
  }
};

const UNKNOWN_SERVICE = {
  id: '00001016d10211e19b2300025b00a5a5',
  characteristics: {
    characteristic0: '00001013d10211e19b2300025b00a5a5',
    characteristic1: '00001017d10211e19b2300025b00a5a5',
    characteristic2: '00001014d10211e19b2300025b00a5a5'
  }
};

const DEVICE_INFO_SERVICE = {
  id: '180a',
  charactersitcs: {
    hardwareRevisionString: '2a27',
    serialNumberString: '2a25',
    modelNumberString: '2a24',
    manufacturerNameString: '2a29',
    firmwareRevisionString: '2a26'
  }
};

module.exports.CONTROL_SERVICE = CONTROL_SERVICE;
module.exports.BLUE_SERVICE = BLUE_SERVICE;
module.exports.UNKNOWN_SERVICE = UNKNOWN_SERVICE;
module.exports.DEVICE_INFO_SERVICE = DEVICE_INFO_SERVICE;
