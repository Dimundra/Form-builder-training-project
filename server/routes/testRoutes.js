const handleDB = require('../controllers/testController');

const testRoute1 = {
  method: 'GET',
  path: '/test',
  handler: async (request, h) => await handleDB(request, h),
};

module.exports = [testRoute1];
