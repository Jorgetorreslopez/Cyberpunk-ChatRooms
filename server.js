require('dotenv').config();
require('./config/database')
const app = require('./app-server');
const PORT = process.env.PORT || 8000;

const http = require('http');
const socketIO = require('socket.io');
const setupSockets = require('./sockets');
console.log(setupSockets); 

const server = http.createServer(app);
const io = socketIO(server);

setupSockets(io);

app.listen(PORT, () => {
    console.log(`API Listening on port ${PORT}`);
});

