const gpio = require('onoff').Gpio;
const dht22 = require('node-dht-sensor');
const ads1x15 = require('ads1x15');

const ads1115 = new ads1x15(1);
const sensorOne = 0;
const sensorTwo = 1;
const sps = 250;
const pga = 4096;

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
		console.log(Math.trunc(fTemp), Math.trunc(humidity));
	});
};

const waterMotor = (gpioInput) => {
	let motor = new gpio(gpioInput, 'out');
	motor.writeSync(0);
	setTimeout(() => {
		motor.writeSync(1);
	}, 5000);
};

getTempAndHumidity();
getSoilMoisture()
	.then(([gardenOne, gardenTwo]) => {
		if (gardenOne > 2000) {
			waterMotor(19);
		}

		if (gardenTwo > 2000) {
			waterMotor(16);
		}
		console.log(gardenOne, gardenTwo);
	})
	.catch((error) => console.log(error));
