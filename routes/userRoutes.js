// routes/userRoutes.js
const { sendResponse } = require('../utils/sendResponse');
const { validateUser } = require('../utils/validateUser');

let users = [];
let nextId = 1;

const userRoutes = {
  'GET /users': (req, res) => {
    sendResponse(res, 200, 'OK', { success: true, data: users, count: users.length });
  },

  'GET /users/:id': (req, res, params) => {
    const user = users.find(u => u.id === parseInt(params.id));
    if (!user) return sendResponse(res, 404, 'Not Found', { success: false, error: 'User not found' });

    sendResponse(res, 200, 'OK', { success: true, data: user });
  },

  'POST /users': (req, res) => {
    let userData;
    try { userData = JSON.parse(req.body); }
    catch { return sendResponse(res, 400, 'Bad Request', { success: false, error: 'Invalid JSON' }); }

    const errors = validateUser(userData);
    if (errors.length) return sendResponse(res, 400, 'Bad Request', { success: false, errors });

    if (users.some(u => u.email === userData.email)) {
      return sendResponse(res, 409, 'Conflict', { success: false, error: 'Email already exists' });
    }

    const newUser = {
      id: nextId++,
      name: userData.name.trim(),
      email: userData.email.toLowerCase(),
      age: userData.age || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    sendResponse(res, 201, 'Created', { success: true, data: newUser });
  },

  'PUT /users/:id': (req, res, params) => {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return sendResponse(res, 404, 'Not Found', { success: false, error: 'User not found' });

    let userData;
    try { userData = JSON.parse(req.body); }
    catch { return sendResponse(res, 400, 'Bad Request', { success: false, error: 'Invalid JSON' }); }

    const errors = validateUser(userData);
    if (errors.length) return sendResponse(res, 400, 'Bad Request', { success: false, errors });

    if (users.some(u => u.email === userData.email && u.id !== userId)) {
      return sendResponse(res, 409, 'Conflict', { success: false, error: 'Email already exists' });
    }

    const updatedUser = {
      ...users[userIndex],
      name: userData.name.trim(),
      email: userData.email.toLowerCase(),
      age: userData.age || null,
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;
    sendResponse(res, 200, 'OK', { success: true, data: updatedUser });
  },

  'DELETE /users/:id': (req, res, params) => {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return sendResponse(res, 404, 'Not Found', { success: false, error: 'User not found' });

    const deleted = users.splice(userIndex, 1)[0];
    sendResponse(res, 200, 'OK', { success: true, message: 'User deleted', data: deleted });
  },

  'OPTIONS': (req, res) => {
    sendResponse(res, 200, 'OK', null, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
  }
};

module.exports = { userRoutes };