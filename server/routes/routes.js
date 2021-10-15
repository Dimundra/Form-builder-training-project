const userRoutes = require('./userRoutes');
const formRoutes = require('./formRoutes');

let routes = [userRoutes, formRoutes].flat();

module.exports = routes;
