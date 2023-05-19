'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class component_suppliers extends Model {
    static associate(models) {
      models.components.belongsToMany(models.suppliers, {
        through: models.component_suppliers,
        foreignKey: "component_id"
      });
      models.suppliers.belongsToMany(models.components, {
        through: models.component_suppliers,
        foreignKey: "supplier_id"
      });
    }
  }
  component_suppliers.init({
    supplier_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'component_suppliers',
  });
  return component_suppliers;
};