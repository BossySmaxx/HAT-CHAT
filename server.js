const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, './public')));

const server = http.createServer(app);
const io = socketio(server);

server.listen(8800, console.log(":Listenign on PORT /8800"));

module.exports = io;