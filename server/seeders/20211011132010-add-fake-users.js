'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        nickname: 'Dimundra',
        email: 'Dimundra@gmail.com',
        password: 'Dimundra123',
      },
      {
        nickname: 'Pasha',
        email: 'Pasha@gmail.com',
        password: 'Pasha123',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
