'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('role_access', [
      {
        id: 1,
        role_id: 1,
        module_id: 1,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        role_id: 1,
        module_id: 2,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        role_id: 1,
        module_id: 3,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        role_id: 1,
        module_id: 4,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        role_id: 1,
        module_id: 5,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        role_id: 1,
        module_id: 6,
        is_read: true,
        is_write: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        role_id: 2,
        module_id: 1,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        role_id: 2,
        module_id: 2,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        role_id: 2,
        module_id: 3,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        role_id: 2,
        module_id: 4,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        role_id: 2,
        module_id: 5,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        role_id: 2,
        module_id: 6,
        is_read: true,
        is_write: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('role_access', null, {});
  }
};