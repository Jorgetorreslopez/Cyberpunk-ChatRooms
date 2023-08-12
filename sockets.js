module.exports = (io) => {
	console.log('setting up sockets');
	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('message', (msg) => {
			console.log("MESSAGE", msg);
			io.emit('message', msg);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	console.log('socket setup complete');
};
