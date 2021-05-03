connected = () => {
	console.log('connected');
};

connected();

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
	socket.send('connected');
});

socket.addEventListener('message', function (event) {
	console.log('message from server ', event.data);
});
