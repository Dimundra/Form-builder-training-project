const userRoutes = require('./userRoutes.js');

let routes = [userRoutes];
routes = routes.flat();

module.exports = routes;
