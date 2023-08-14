require('dotenv').config();
require('./config/database');
const app = require('./app-server');
const PORT = process.env.PORT || 8000;

const cors = require('cors');
const http = require('http')
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	}
})

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on('join_room', (data) => {
		socket.join(data);
		console.log(`🔥: User ${socket.id} joined room ${data}`);
	})

	socket.on('send_message', (data) => {
		console.log(data)
		socket.to(data.room).emit("receive_message", data);
		socket.emit("receive_message", data);
	})

	socket.on('disconnect', () => {
		console.log(`🔥: User ${socket.id} disconnected`);
	})
})

server.listen(PORT, () => {
	console.log(`API Listening on port ${PORT}`);
})

