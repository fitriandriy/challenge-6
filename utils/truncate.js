const client = require('../config/database');
const {component_products, component_suppliers} = require('../models');

module.exports = {
  destroyProduct: async () => {
    const query = 'TRUNCATE "component_products", "products" RESTART IDENTITY';
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
  destroyComponent: async () => {
    const query = 'TRUNCATE "component_products", "components", "component_suppliers" RESTART IDENTITY';
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
  destroySuppliers: async () => {
    const query = 'TRUNCATE "component_suppliers", "suppliers" RESTART IDENTITY';
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
  destroyComponentProduct: async () => {
    await component_products.destroy({truncate: true, restartIdentity: true})
  },
  destroyComponentSupplier: async () => {
    await component_suppliers.destroy({truncate: true, restartIdentity: true})
  },
}