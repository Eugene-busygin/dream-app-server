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

// Запуск сервера на порту 
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// Обработка соединения нового клиента
io.on('connection', (socket) => {
  console.log('New client connected');

  // Пример отправки данных каждую секунду
  const interval = setInterval(() => {
    const data = 'Hello from server!'; // Данные, которые будут отправлены клиенту
    socket.emit('data-update', data); // Отправка данных клиенту по событию 'data-update'
  }, 1000);

  // Обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval); // Остановка отправки данных при отключении клиента
  });
});