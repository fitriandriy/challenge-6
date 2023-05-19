'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class component_products extends Model {
    static associate(models) {
      models.components.belongsToMany(models.products, {
        through: models.component_products,
        foreignKey: "component_id"
      });
      models.products.belongsToMany(models.components, {
        through: models.component_products,
        foreignKey: "product_id"
      });
    }
  }
  component_products.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'component_products',
  });
  return component_products;
};