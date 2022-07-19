const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const io = socket(server);

let messages = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/client/index.html');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
