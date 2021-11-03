const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(cors({origin: "*"}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.createServer(app);
const io = socketio(server);

server.listen(3000, console.log(":Listenign on PORT /8800"));

module.exports = io;
