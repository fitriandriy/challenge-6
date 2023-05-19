'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class components extends Model {
    static associate(models) {
      models.components.belongsToMany(models.suppliers, {
        through: models.component_suppliers,
        foreignKey: "component_id"
      });
      models.components.belongsToMany(models.products, {
        through: models.component_products,
        foreignKey: "component_id"
      });
    }
  }
  components.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'components',
  });
  return components;
};