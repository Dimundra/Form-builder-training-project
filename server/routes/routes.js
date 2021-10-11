const userRoutes = require('./userRoutes');
const testRoutes = require('./testRoutes');

let routes = [userRoutes, testRoutes].flat();

module.exports = routes;
