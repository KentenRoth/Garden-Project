var Gpio = require('onoff').Gpio;
var ads1x15 = require('node-ads1x15'); // This also requires npm module 'CoffeeScript'

var waterMotorOne = new Gpio(19, 'out');
var waterMotorTwo = new Gpio(26, 'out');

var ads1115 = new ads1x15(1);
var sensorOne = 0;
var sensorTwo = 1;

var samplesPerSecond = '250';
var gain = '4096';

waterMotorOneOn = () => {
	waterMotorOne.writeSync(1);
};

waterMotorOneOff = () => {
	waterMotorOne.writeSync(0);
	waterMotorOne.unexport();
};

waterMotorTwoOn = () => {
	waterMotorTwo.writeSync(1);
};

waterMotorTwoOff = () => {
	waterMotorTwo.writeSync(0);
	waterMotorTwo.unexport();
};

allMotorsOff = () => {
	waterMotorOne.writeSync(0);
	waterMotorTwo.writeSync(0);
	waterMotorOne.unexport();
	waterMotorTwo.unexport();
};

// function to get info from sensors
planterOne = () => {
	if (!ads1115.busy) {
		ads1115.readADCSingleEnded(
			sensorOne,
			gain,
			samplesPerSecond,
			function (err, data) {
				if (err) {
					throw err;
				}
				if (data > 2000) {
					waterMotorOneOn();
					setTimeout(function () {
						waterMotorOneOff();
						planterTwo();
					}, 10000);
				} else {
					return planterTwo();
				}
			}
		);
	}
};

PlanterTwo = () => {
	if (!ads1115.busy) {
		ads1115.readADCSingleEnded(
			sensorTwo,
			gain,
			samplesPerSecond,
			function (err, data) {
				if ((err, data)) {
					throw err;
				}
				if (data > 2000) {
					waterMotorTwoOn();
					setTimeout(function () {
						waterMotorTwoOff(), allMotorsOff();
					}, 1000);
				} else {
					return allMotorsOff();
				}
			}
		);
	}
};
// Wet soil around 1500 - 1600 dry soil around 2300 - 2400s
// Set watering point at 2050

// function to togle motors

// only 1 motor running at a time
// motor outputs roughly 2 cups water in 20 seconds

// needs to have a fail safe if sensor stops working
