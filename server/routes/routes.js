const userRoutes = require('./userRoutes');
const formRoutes = require('./formRuotes');
const testRoutes = require('./testRoutes');

let routes = [userRoutes, testRoutes, formRoutes].flat();

module.exports = routes;
