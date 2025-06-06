// server.js
const net = require('net');
const { parseRequest } = require('./utils/parseRequest');
const { matchRoute } = require('./routes/router');
const { sendResponse } = require('./utils/sendResponse');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    try {
      const request = parseRequest(data);
      console.log(`${request.method} ${request.path}`);

      const route = matchRoute(request.method, request.path);

      if (!route) {
        return sendResponse(socket, 404, 'Not Found', {
          success: false,
          error: 'Route not found'
        });
      }

      route.handler(request, socket, route.params);
    } catch (error) {
      console.error('Request Error:', error);
      sendResponse(socket, 500, 'Internal Server Error', {
        success: false,
        error: 'Internal server error'
      });
    }
  });

  socket.on('close', () => console.log('Client disconnected'));
  socket.on('error', (err) => console.error('Socket error:', err));
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`🚀 User CRUD API Server running on http://${HOST}:${PORT}`);
});