const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const Form = require('./Form');
const env = process.env.NODE_ENV || 'development';

const database =
  env === 'development' ? 'form_builder' : 'test' ? 'form_builder_test' : '';

const sequelize = new Sequelize(database, 'root', 'appleiphone5', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
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
