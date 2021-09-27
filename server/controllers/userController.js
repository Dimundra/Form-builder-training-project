const authenticateUser = require('../services/auth.js');

const loginHandler = (request, h) => {
  const email = request.payload.email;
  const password = request.payload.password;

  return authenticateUser(email, password);
};

module.exports = loginHandler;
