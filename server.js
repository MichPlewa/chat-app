const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

let messages = [];
let users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/client/index.html');
});

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    console.log(message);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('join', (userName) => {
    userName.id = socket.id;
    users.push(userName);
    console.log(userName);
    socket.broadcast.emit('join', {
      author: 'Chat Bot',
      content: `${userName.name} has joined the conversation!`,
    });
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const leftUser = users.filter((item) => socket.id === item.id);
    console.log(leftUser);
    socket.broadcast.emit('join', {
      author: 'Chat Bot',
      content: `${leftUser[0].name} has left the conversation!`,
    });
    users = users.filter((item) => item.id !== socket.id);
  });
  console.log("I've added a listener on message and disconnect events \n");
});
