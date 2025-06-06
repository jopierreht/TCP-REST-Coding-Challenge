// utils/parseRequest.js
const parseRequest = (data) => {
  const lines = data.toString().split('\r\n');
  const [method, path, version] = lines[0].split(' ');

  const headers = {};
  let i = 1;
  while (lines[i] && lines[i] !== '') {
    const [key, value] = lines[i].split(': ');
    headers[key.toLowerCase()] = value;
    i++;
  }

  let body = lines.slice(i + 1).join('\r\n');
  return { method, path, version, headers, body };
};

module.exports = { parseRequest };