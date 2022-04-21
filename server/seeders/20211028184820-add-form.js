'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('forms', [
      {
        id: 1,
        name: 'Birthdays',
        data: '{"organizer": "Dima"}',
        user_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('forms', {
      id: 1,
    });
  },
};
