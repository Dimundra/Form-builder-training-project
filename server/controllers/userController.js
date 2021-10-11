const authenticateUser = require('../services/auth.js');

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  return await authenticateUser(email, password);
};

const cabinetPageHandler = (request, h) => {
  return 'Here should be the list of the constructed forms!';
};

module.exports = { loginHandler, cabinetPageHandler };
