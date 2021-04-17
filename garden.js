var Gpio = require('onoff').Gpio;
var ads1x15 = require('node-ads1x15'); // This also requires npm module 'CoffeeScript'

// 4 moisture sensors and 4 motors.

// function to get info from sensors
// Wet soil around 1500 - 1600 dry soil around 2300 - 2400s
// Set watering point at 2050

// function to togle motors

// only 1 motor running at a time
// motor outputs roughly 2 cups water in 20 seconds

// needs to have a fail safe if sensor stops working
