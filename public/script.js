connected = () => {
	console.log('connected');
};

connected();

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
	console.log('connected to websocket server');
});

socket.addEventListener('message', function (event) {
	console.log('message from server ', event.data);
});
