const http = require('http');

module.exports = (io) => {
	console.log('setting up sockets');
	const socketIO = require('socket.io')(http, {
		cors: {
			origin: "http://localhost:3000"
		}
	})

	socketIO.on('connection', (socket) => {
		console.log(`⚡: ${socket.id} user just connected!`);

		socket.on('message', (data) => {
			io.emit('messageResponse', data);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	console.log('socket setup complete');
};
