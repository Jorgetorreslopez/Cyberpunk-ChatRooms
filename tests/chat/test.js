const io = require('socket.io-client');
const socket = io('http://localhost:8000');

socket.on('connect', () => {
	console.log('Connected to server');

	setInterval(() => {
		const message = `USER: ${socket.id}`;
		socket.emit('message', message);
	}, 3000);
});

socket.on('message', (msg) => {
    console.log(`Recieved message: ${msg}`);
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
})