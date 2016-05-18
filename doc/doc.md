

<!-- Start lib/sphero-sdk.js -->

## Sphero

Module dependencies.

## Sphero

Module exports.

<!-- End lib/sphero-sdk.js -->




<!-- Start lib/command/command.js -->

## PromiseBB

Module dependencies.

## exports

Module exports.

## Command(connection)

Initialize a new `Command` with the given `connection`.

See: http://sdk.sphero.com/api-reference/api-quick-reference/

Options:

  - `connection` the devices connection property

### Params:

* **Connection** *connection* 

## send(serviceId, characteristicId, data)

Send a command with the given `serviceId`, `characteristicId` and data to `connection`.

### Params:

* **string** *serviceId* 
* **string** *characteristicId* 
* **CommandPacket** *data* 

<!-- End lib/command/command.js -->




<!-- Start lib/command/core-command.js -->

## Command

Module dependencies.

## exports

Module exports.

## CoreCommand(connection)

Initialize a new `CoreCommand` with the given `connection`. Extends `Command`.

Options:

  - `connection` the devices connection property

### Params:

* **Connection** *connection* 

## ping()

Ping the device

Device responds with a simple response: `DLEN` 01h

### Return:

* **Promise** 

## getVersion()

Get the device's versioning information.

Device responds with `DLEN` 0Bh and `Data`

Data:

- Name       Byte  Description
- `RECV`     0     This record version number, currently set to 02h. This will increase when more resources are added
- `MDL`      1     Model number; currently 02h for Sphero
- `HW`       2     Hardware version code (ranges 1 through 9)
- `MSA-ver`  3     Main Sphero Application version byte
- `MSA-rev` 	4     Main Sphero Application revision byte
- `BL`       5     Bootloader version in packed nibble format (i.e. 32h is version 3.2)
- `BAS` 	    6     orbBasic version in packed nibble format (i.e. 4.4)
- `MACRO` 	  7     Macro executive version in packed nibble format (4.4)
- `API-maj` 	8     major revision code this firmware implements
- `API-min` 	9     API minor revision code this firmware implements

### Return:

* **Promise** 

## setBluetoothName(name)

Set the device's bluetooth name.

Device responds with a simple response

Options:

  - `name` the name to be set as the device's bluetooth name

### Params:

* **string** *name* 

name

<!-- End lib/command/core-command.js -->




<!-- Start lib/command/ollie-command.js -->

## PromiseBB

Module dependencies.

## exports

Module exports.

<!-- End lib/command/ollie-command.js -->




<!-- Start lib/command/sphero-command.js -->

## CoreCommand

Module dependencies.

## exports

Module exports.

<!-- End lib/command/sphero-command.js -->




<!-- Start lib/connection/connection.js -->

<!-- End lib/connection/connection.js -->




<!-- Start lib/connection/noble-connection.js -->

## Connection

Module dependencies.

<!-- End lib/connection/noble-connection.js -->




<!-- Start lib/device/bb8-device.js -->

## Ollie

Module dependencies.

## exports

Module exports.

## BB8(uuid)

Initialize a new `BB8` with the given `uuid`. Extends `Ollie`.

Options:

  - `uuid` the uuid of the device

### Params:

* **string** *uuid* 

<!-- End lib/device/bb8-device.js -->




<!-- Start lib/device/device.js -->

## Connection

Module dependencies.

## exports

Module exports.

## Device(uuid, command)

Initialize a new `Device` with the given `uuid` and `command`.

Options:

  - `uuid` the uuid of the device
  - `command` the command set the device uses

### Params:

* **string** *uuid* 
* **Command** *command* 

<!-- End lib/device/device.js -->




<!-- Start lib/device/ollie-device.js -->

## Device

Module dependencies.

## exports

Module exports.

## Ollie(uuid)

Initialize a new `Ollie` with the given `uuid`. Extends `Device`.

Options:

  - `uuid` the uuid of the device

### Params:

* **string** *uuid* 

<!-- End lib/device/ollie-device.js -->




<!-- Start lib/device/sphero-device.js -->

## Device

Module dependencies.

## exports

Module exports.

## Sphero(uuid)

Initialize a new `Sphero` with the given `uuid`. Extends `Device`.

Options:

  - `uuid` the uuid of the device

### Params:

* **string** *uuid* 

<!-- End lib/device/sphero-device.js -->




<!-- Start lib/packet/command-packet.js -->

# command-packet.js

This file is responsible for creating, reading and managing valid sphero
packets.

Author: Jordan Majd <jordan@madtitanstudios.com>

Version: 0.0.1

## Packet

Module dependencies.

## CommandPacket(DID:, CID:, Data:, SEQ:, requestAnswer:, resetTimeout:)

Command Packet Constructor. Command Packets are sent over bluetooth to
devices in order to issue a command.

### Examples:

   let command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);

### Params:

* **Number** *DID:* Device Id
* **Number** *CID:* Command Id
* **Buffer** *Data:* Optional data to send with the packet
* **Number** *SEQ:* Sequence Number
* **Boolean** *requestAnswer:* whether or not the device should respond.
* **Boolean** *resetTimeout:* specifies whether or not the device should resest its timer since it last received a command.

<!-- End lib/packet/command-packet.js -->




<!-- Start lib/packet/packet.js -->

# packet.js

This file is responsible for creating, reading and managing valid sphero
packets.

Author: Jordan Majd <jordan@madtitanstudios.com>

Version: 0.0.1

## Packet()

Packet Constructor. Should not be instantiated, instead should be inherited
from. Packets are used by Connection objects, packets are written to devices
and read from devices in order to communicate.

### Examples:

    function CommandPacket(...){
       Packet.call(this);

## computeCheckSum(packetBuffer)

Calculates a checksum for the packet. Checksum is computed in two steps.
First, all the fields in the packet are summed, excluding SOP1, SOP2 and
CHCK. Next, the summation is modulod by 256.

### Examples:

    this.CHCK = this.computeCheckSum(packetBuffer);

### Params:

* **Buffer** *packetBuffer* a valid Packet buffer.

### Return:

* **Number** checksum value of packetBuffer.

<!-- End lib/packet/packet.js -->




<!-- Start lib/packet/response-packet.js -->

## Packet

Module dependencies.

## ResponsePacket(responseBuffer:)

Response Packet Constructor. Response Packets are sent from devices over
bluetooth.

### Examples:

   var command = CommandPacket(0x01, 0x01, 0x52, undefined, true, true);

### Params:

* **Buffer** *responseBuffer:* this is a buffer filled with the response packet data.imer since it last received a command.

<!-- End lib/packet/response-packet.js -->




<!-- Start lib/utility/api.js -->

<!-- End lib/utility/api.js -->




<!-- Start lib/utility/command-resolver.js -->

## CommandResolver()

Command Resolver Constructor

## addResolution(resFunc:)

addResolution adds a callback function or promise to the resolutionQueue.

### Params:

* **Function** *resFunc:* this is a callback function or promise that will invoked or resolved when the command is successfully issued and the orb has responded.

## resolve()

invokes / resolves the next callback function / promise in the resolutionQueue.

<!-- End lib/utility/command-resolver.js -->




<!-- Start lib/utility/services.js -->

<!-- End lib/utility/services.js -->

