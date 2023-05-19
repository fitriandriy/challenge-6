'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    static associate(models) {
      models.suppliers.belongsToMany(models.components, {
        through: models.component_suppliers,
        foreignKey: "supplier_id"
      });
    }
  }
  suppliers.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suppliers',
  });
  return suppliers;
};