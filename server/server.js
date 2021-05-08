const express = require('express');
const routes = require('./routes');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const port = 3000;

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
	ws.send('Connected');
	ws.on('message', function incoming(data) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});

app.use(cors());

app.use(express.json());
app.use('/garden', routes);

server.listen(port, () => {
	console.log(`Connected on port ${port}`);
});
