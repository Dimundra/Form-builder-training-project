const Joi = require('joi');
const {
  loginHandler,
  cabinetPageHandler,
} = require('../controllers/userController');

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: (request, h) => loginHandler(request, h),
  options: {
    cors: true,
    validate: {
      payload: Joi.object({
        email: Joi.string().required('required!').email(),
        password: Joi.string().required('required').min(6).max(20),
      }),
    },
  },
};

const cabinetRoute = {
  method: 'GET',
  path: '/cabinet',
  handler: (request, h) => cabinetPageHandler(request, h),
  options: {
    auth: 'jwt',
  },
};

module.exports = [loginRoute, cabinetRoute];
