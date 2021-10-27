const socketio = require('./server');

class User {
    constructor (id, username, joinedAt) {
        this.id = id;
        this.username = username;
        this.joinedAt = joinedAt || Date.now();
    }
}

let users = [];

socketio.on('connection', (socket) => {
    console.log("a new connection made with id : ", socket.id);
    socket.on('new-user', (name) => {
        console.log("new user connected", name);
        users.push(new User(socket.id, name, Date.now()));
        console.log(users);
        socketio.emit('greetings', users);
    });

    socket.on('new-message', (msg) => {
        let user;
        for (let i = 0; i < users.length; i++) {
            if (socket.id === users[i].id) {
                user = users[i];
            }
        }
        socketio.emit('msg-received', {msg, user});
    });

    socket.on('disconnect', (status) => {
        for (let i = 0; i < users.length; i++) {
            console.log(socket.id, users[i].id);
            if (socket.id === users[i].id) {
                users.splice(i, 1);
            }
        }

        for (let i = 0; i < users.length; i++) {

        }
        socketio.emit('disconnected', users);
    });
});
