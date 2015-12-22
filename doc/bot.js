

<!-- Start lib/bot.js -->

## Bot(The, The, {String}(optional))

Constructor used to create and connect to a bot

### Examples:

    var bb8 = Bot(Bot.models.bb8, Bot.connections.noble, Bot.controllers.dualshock);

### Params:

* **String** *The* model of robot to connect to.
* **String** *The* type ofconnection to establish communication with the robot.
* *{String}(optional)* The type of controller to attach to the robot.

### Return:

* **Bot** A bot that allows you to connect and command the robot.

<!-- End lib/bot.js -->

