var Gpio = require('onoff').Gpio;
var ads1x15 = require('node-ads1x15'); // This also requires npm module 'CoffeeScript'
var axios = require('axios');

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
	console.log('Connected');
});

socket.addEventListener('message', function (event) {
	console.log('message from server ', event.data);
});

const url = 'http://localhost:3000/garden';
measurementData = (mess, id) => {
	axios
		.get(url + `/sensors/${mess},${id}`)
		.then((data) => socket.send(`measurement + ${id}`));
};

wateringData = (id) => {
	axios
		.get(url + `/waterMotorsInsert/${id}`)
		.then((data) => socket.send(`watering + ${id}`));
};

waterMotorOneOn = () => {
	waterMotorOne.writeSync(0);
};

waterMotorOneOff = () => {
	wateringData(1);
	waterMotorOne.writeSync(1);
};

waterMotorTwoOn = () => {
	waterMotorTwo.writeSync(0);
};

waterMotorTwoOff = () => {
	wateringData(2);
	waterMotorTwo.writeSync(1);
};

allMotorsOff = () => {
	waterMotorOne.writeSync(1);
	waterMotorTwo.writeSync(1);
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
					measurementData(data, 1);
					waterMotorOneOn();
					setTimeout(function () {
						waterMotorOneOff();
					}, 20000);
					setTimeout(function () {
						planterTwo();
					}, 22000);
				} else {
					measurementData(data, 1);
					return setTimeout(function () {
						planterTwo();
					}, 2000);
				}
			}
		);
	}
};

planterTwo = () => {
	if (!ads1115.busy) {
		ads1115.readADCSingleEnded(
			sensorTwo,
			gain,
			samplesPerSecond,
			function (err, data) {
				if (err) {
					throw err;
				}
				if (data > 2000) {
					measurementData(data, 2);
					waterMotorTwoOn();
					setTimeout(function () {
						waterMotorTwoOff(), allMotorsOff();
					}, 2000);
				} else {
					measurementData(data, 2);
					return allMotorsOff();
				}
			}
		);
	}
};
