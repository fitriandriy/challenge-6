'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('suppliers', [
      {
        name: "PT Astra",
        address: "Sempu",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Daihatsu",
        address: "Sempu",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cataliz.id",
        address: "Sempu",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('suppliers', null, {});
  }
};
