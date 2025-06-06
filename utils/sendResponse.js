// utils/sendResponse.js
const sendResponse = (socket, statusCode, statusText, data = null, headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...headers
  };

  const body = data ? JSON.stringify(data) : '';
  const contentLength = Buffer.byteLength(body, 'utf8');

  let response = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  for (const [key, val] of Object.entries(defaultHeaders)) {
    response += `${key}: ${val}\r\n`;
  }

  response += `Content-Length: ${contentLength}\r\nConnection: close\r\n\r\n${body}`;
  socket.write(response);
  socket.end();
};

module.exports = { sendResponse };