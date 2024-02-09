const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

// Serve HTML page with text field
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from clients
  socket.on('sendMessage', (message) => {
    console.log('received message: ' + message);
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Multi-Player Battle at:  http://localhost:${port}`);
});
