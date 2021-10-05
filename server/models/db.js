const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('form_builder_db', 'root', 'appleiphone5', {
  host: 'localhost',
  dialect: 'mysql',
});

const users = [
  {
    id: 0,
    nick_name: 'Dima',
    email: 'dima@gmail.com',
    password: 'helloDima6',
  },
  {
    id: 1,
    nick_name: 'V',
    email: 'V@gmail.com',
    password: 'helloV',
  },
];

module.exports = users;
