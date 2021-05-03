const socket = new WebSocket('ws://localhost:3000');
const url = 'http://localhost:3000/garden';

socket.addEventListener('open', function (event) {
	socket.send('connected');
});

socket.addEventListener('message', function (event) {
	console.log('message from server ', event.data);
});

getWateringData = (num) => {
	axios
		.get(url + `/waterMotors/${num}`)
		.then((data) => console.log(data.data[0]))
		.catch((err) => console.log(err));
};

getSensorData = (num) => {
	axios
		.get(url + `/${num}`)
		.then((data) => console.log(data.data[0]))
		.catch((err) => console.log(err));
};

getWateringData(1);
getWateringData(2);
getSensorData(1);
getSensorData(2);
