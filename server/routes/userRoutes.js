const Joi = require('joi');
const loginHandler = require('../controllers/userController.js');

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

module.exports = [loginRoute];
