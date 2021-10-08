const { Sequelize, Model, DataTypes } = require('sequelize');
const user = require('./user');
const form = require('./form');

const sequelize = new Sequelize('form_builder', 'root', 'appleiphone5', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = { user, form };

// initialize the models
Object.keys(models).forEach((model) => {
  models[model] = models[model](sequelize, Model, DataTypes);
});

// associate models
Object.keys(models).forEach((model) => {
  models[model].associate(models);
});

async function initDB() {
  await sequelize.sync({ force: true });
}
initDB();
