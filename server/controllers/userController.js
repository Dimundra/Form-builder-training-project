const authenticateUser = require('../services/auth.js');

const loginHandler = (request, h) => {
  const { email, password } = request.payload;

  return authenticateUser(email, password);
};

module.exports = loginHandler;
