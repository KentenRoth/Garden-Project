const socket = new WebSocket('ws://localhost:3000');
const url = 'http://localhost:3000/garden';

socket.addEventListener('open', function (event) {
	socket.send('connected');
});

socket.addEventListener('message', function (event) {
	console.log(event.data);
	updateFrontEnd(event.data);
});

getWateringData = (num) => {
	axios
		.get(url + `/waterMotors/${num}`)
		.then((data) => {
			console.log(data.data[0]);
			setPlant(data.data[0].plant, num);
			setWatered(data.data[0].time, num);
		})
		.catch((err) => console.log(err));
};

getSensorData = (num) => {
	axios
		.get(url + `/${num}`)
		.then((data) => {
			console.log(data);
			setMeasurement(data.data[0].messurment, num);
		})
		.catch((err) => console.log(err));
};

setPlant = (plant, num) => {
	const plantedPlanter = document.getElementById(`planted${num}`);
	const planted = document.createElement('p');
	planted.textContent = `Plant: ${plant}`;
	plantedPlanter.appendChild(planted);
};

setMeasurement = (measure, num) => {
	const measurementPlanter = document.getElementById(`measurement${num}`);
	const measurement = document.createElement('p');
	measurement.textContent = `Measurement: ${measure}`;
	measurementPlanter.appendChild(measurement);
};

setWatered = (watered, num) => {
	const wateredPlanter = document.getElementById(`watered${num}`);
	const wateredDate = document.createElement('p');
	wateredDate.textContent = `Last Watered: ${watered}`;
	wateredPlanter.appendChild(wateredDate);
};

clearMeasurementData = (id) => {
	document.getElementById(`measurement${id}`).innerHTML = '';
};

clearWateredData = (id) => {
	document.getElementById(`planted${id}`).innerHTML = '';
	document.getElementById(`watered${id}`).innerHTML = '';
};

updateFrontEnd = (param) => {
	switch (param) {
		case 'measurement + 1':
			clearMeasurementData(1);
			getSensorData(1);
			break;
		case 'measurement + 2':
			clearMeasurementData(2);
			getSensorData(2);
			break;
		case 'watering + 1':
			clearWateredData(1);
			getWateringData(1);
			break;
		case 'watering + 2':
			clearWateredData(2);
			getWateringData(2);
			break;
		default:
			return console.log(param);
	}
};

getWateringData(1);
getWateringData(2);
getSensorData(1);
getSensorData(2);
