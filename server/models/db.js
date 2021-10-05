const { Sequelize } = require('sequelize');
const setAssociation = require('../helpers/setAssociation');

const sequelize = new Sequelize('form_builder', 'root', 'appleiphone5', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = [require('./user'), require('./form')];

// define models
for (const modelDefiner of models) {
  modelDefiner(sequelize);
}

// set one-to-many relation
setAssociation(sequelize);

//sync with DB
async function initDB() {
  await sequelize.sync({ force: true });
}
initDB();
