const express = require('express');
const routes = require('./routes');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const port = 3000;

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
	console.log('Connected!!!');
	ws.send('Welcome');

	ws.on('message', function incoming(message) {
		console.log(message);
	});
});

app.use(express.json());

app.use('/garden', routes);

server.listen(port, () => {
	console.log(`Connected on port ${port}`);
});
