const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan')
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const setupSockets = require('./sockets');
console.log(setupSockets);

const server = http.createServer(app);
const io = socketIO(server);

setupSockets(io);

/* Middleware */
app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}

app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

app.use(logger('dev'))

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require("./routes/api/users"));



// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

module.exports = app