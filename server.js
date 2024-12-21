'use strict';
import express from 'express';
import socketIo from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express();
app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));

const server = createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => console.log('Client disconnected'));
  
  socket.on('messaged', (args) => {
    io.emit('message', args);
    console.log(args);
  });
  
  socket.on('event_name', (...args) => {
    io.emit('message2', args);
    console.log(args);
  });
});
