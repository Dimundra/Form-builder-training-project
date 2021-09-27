const loginHandler = require('../controllers/userController.js');

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: (request, h) => loginHandler(request, h),
  options: {
    cors: true,
  },
};

module.exports = loginRoute;
