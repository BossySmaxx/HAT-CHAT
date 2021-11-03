const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(cors({origin: "*"}));

const server = http.createServer(app);
const io = socketio(server);

server.listen(3000, console.log(":Listenign on PORT /3000"));

module.exports = io;
