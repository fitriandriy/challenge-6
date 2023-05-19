'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      models.products.belongsToMany(models.components, {
        through: models.component_products,
        foreignKey: "product_id"
      });
    }
  }
  products.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};