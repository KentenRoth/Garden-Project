var Gpio = require('onoff').Gpio;
var ads1x15 = require('node-ads1x15'); // This also requires npm module 'CoffeeScript'
const {
	planterOneMessurment,
	planterTwoMessurment,
	waterMotorOneActivated,
	waterMotorTwoActivated,
} = require('./serverAndCalls');

var waterMotorOne = new Gpio(19, 'out');
var waterMotorTwo = new Gpio(26, 'out');

var ads1115 = new ads1x15(1);
var sensorOne = 0;
var sensorTwo = 1;

var samplesPerSecond = '250';
var gain = '4096';

const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
	socket.send('garden.js Connected');
});

socket.addEventListener('message', function (event) {
	console.log('message from server ', event.data);
});

waterMotorOneOn = () => {
	waterMotorOne.writeSync(1);
	waterMotorOneActivated();
	socket.send('Hello from garden.js');
};

waterMotorOneOff = () => {
	waterMotorOne.writeSync(0);
	waterMotorOne.unexport();
};

waterMotorTwoOn = () => {
	waterMotorTwo.writeSync(1);
	waterMotorTwoActivated();
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
					planterOneMessurment(data);
					waterMotorOneOn();
					setTimeout(function () {
						waterMotorOneOff();
						planterTwo();
					}, 100);
				} else {
					planterOneMessurment(data);
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
					planterTwoMessurment(data);
					waterMotorTwoOn();
					setTimeout(function () {
						waterMotorTwoOff(), allMotorsOff();
					}, 1000);
				} else {
					planterTwoMessurment(data);
					return allMotorsOff();
				}
			}
		);
	}
};
