const gpio = require('onoff').Gpio;
const dht22 = require('node-dht-sensor');
const ads1x15 = require('ads1x15');

const axios = require('axios');
const url = 'http://localhost:3000/garden';

const ads1115 = new ads1x15(1);
const sensorOne = 0;
const sensorTwo = 1;
const sps = 250;
const pga = 4096;

const setPlanter = (plant, planter) => {
	axios
		.post(url + `/garden/${plant}, ${planter}`)
		.then((result) =>
			console.log(`Plant and Planter return status ${result.status}`)
		);
};

const getSoilMoisture = async () => {
	await ads1115.openBus(1);
	if (!ads1115.busy) {
		const gardenOne = await ads1115.readADCSingleEnded(sensorOne, pga, sps);
		const gardenTwo = await ads1115.readADCSingleEnded(sensorTwo, pga, sps);

		return [gardenOne, gardenTwo];
	}
};

const getTempAndHumidity = async () => {
	dht22.read(22, 4, function (err, temp, humidity) {
		if (err) return console.log(err);
		let fTemp = (temp * 9) / 5 + 32;
		axios
			.post(url + `/temperature/${fTemp}, ${humidity}`)
			.then((result) =>
				console.log(`Temp and Humidity return status ${result.status}`)
			);
	});
};

const waterMotor = (gpioInput, planter) => {
	// IN1 PIN 26 - IN2 PIN 20 - IN3 PIN 16 - IN4 PIN 19
	let motor = new gpio(gpioInput, 'out');
	motor.writeSync(0);
	setTimeout(() => {
		motor.writeSync(1);
		sendWateringTime(planter);
	}, 10000);
};

const sendSoilMoistureLevels = (moistureLevel, planter) => {
	axios
		.post(url + `/soil/${moistureLevel},${planter}`)
		.then((result) =>
			console.log(
				`Soil in planter ${planter} return status ${result.status}`
			)
		);
};

const sendWateringTime = (planter) => {
	axios
		.post(url + `/watering/${planter}`)
		.then((result) =>
			console.log(
				`Watering logged on planter ${planter} return status ${result.status}`
			)
		);
};

const getTemperatureData = () => {
	axios
		.get(url + '/temperature')
		.then((results) => console.log(results.data));
};

getTempAndHumidity();

getSoilMoisture()
	.then(([gardenOne, gardenTwo]) => {
		sendSoilMoistureLevels(gardenOne, 1);
		sendSoilMoistureLevels(gardenTwo, 2);

		if (gardenOne > 2000) {
			waterMotor(26, 1);
		}

		if (gardenTwo > 2000) {
			waterMotor(20, 2);
		}
		console.log(gardenOne, gardenTwo);
	})
	.catch((error) => console.log(error));

// setPlanter('Radishes', 1)
// setPlanter('Green Onions', 2)
