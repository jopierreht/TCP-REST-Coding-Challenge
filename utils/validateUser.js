// utils/validateUser.js
const validateUser = (user) => {
  const errors = [];

  if (!user.name || typeof user.name !== 'string' || user.name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!user.email || typeof user.email !== 'string') {
    errors.push('Email is required and must be a string');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Email must be a valid email address');
  }

  if (user.age !== undefined && (!Number.isInteger(user.age) || user.age < 0 || user.age > 150)) {
    errors.push('Age must be a positive integer between 0 and 150');
  }

  return errors;
};

module.exports = { validateUser };