const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
