'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('modules', [
        {
            id: 1,
            name: "Products",
            description: "All about products",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            name: "Components",
            description: "All about components",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            name: "Supplier",
            description: "All about supplier",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            name: "Component_product",
            description: "All about component_product",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 5,
            name: "Component_supplier",
            description: "All about component_supplier",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 6,
            name: "Authorization",
            description: "All about authorization",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('modules', null, {});
  }
};
