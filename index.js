// Сервер.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rootDirectory = path.join(__dirname, `${process.env.ROOT_PATH}`);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

io.on('connection', (socket) => {
  console.log('Client connection');
  socket.emit('message', { data: 'Hello from server!' });
  socket.on("join", () => {

    const interval = setInterval(() => {
      socket.emit('message', { data: 'Hello from server!' });
    }, 1000);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });

  })
});