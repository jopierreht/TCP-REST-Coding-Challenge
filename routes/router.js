// routes/router.js
const { userRoutes } = require('./userRoutes');

const matchRoute = (method, path) => {
  const directKey = `${method} ${path}`;
  if (userRoutes[directKey]) {
    return { handler: userRoutes[directKey], params: {} };
  }

  if (method === 'OPTIONS') {
    return { handler: userRoutes['OPTIONS'], params: {} };
  }

  const paramMatch = path.match(/^\/users\/(\d+)$/);
  if (paramMatch) {
    const paramKey = `${method} /users/:id`;
    if (userRoutes[paramKey]) {
      return {
        handler: userRoutes[paramKey],
        params: { id: paramMatch[1] }
      };
    }
  }

  return null;
};

module.exports = { matchRoute };