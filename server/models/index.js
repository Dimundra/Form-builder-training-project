const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const Form = require('./Form');

const sequelize = new Sequelize('form_builder', 'root', 'appleiphone5', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = { User, Form };

// initialize the models
Object.keys(models).forEach((model) => {
  models[model] = models[model](sequelize, DataTypes);
});

// associate models
Object.keys(models).forEach((model) => {
  models[model].associate(models);
});

module.exports = sequelize;
