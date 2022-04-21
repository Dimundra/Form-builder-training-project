'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        nickname: 'Nino',
        email: 'nino@gmail.com',
        password:
          '$2a$12$k9rhvlVNl7AHOXJyszQSSOzQpqrUteSHx1u2IBel9o46oWhWV2oEK',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: 1,
    });
  },
};
