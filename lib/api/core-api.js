'use strict';


const API_CORE = {
  DID_CORE: 0x00,
  CMD_PING: 0x01,
  CMD_VERSION: 0x02,
  CMD_SET_BT_NAME: 0x10,
  CMD_GET_BT_NAME: 0x11,
  CMD_SET_AUTO_RECONNECT: 0x12,
  CMD_GET_AUTO_RECONNECT: 0x13,
  CMD_GET_PWR_STATE: 0x20,
  CMD_SET_PWR_NOTIFY: 0x21,
  CMD_SLEEP: 0x22,
  SET_INACTIVE_TIMER: 0x25,
  CMD_GOTO_BL: 0x30,
  CMD_RUN_L1_DIAGS: 0x40,
  CMD_RUN_L2_DIAGS: 0x41
};

module.exports = API_CORE;