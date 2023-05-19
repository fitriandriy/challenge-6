'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('components', [
      {
        name: "Mouse",
        description: "Wireless",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lamp",
        description: "10 watt",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Screen Protector",
        description: "Protect from blue light",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('components', null, {});
  }
};
