"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  carts.init(
    {
      customer_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      order_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "carts",
    }
  );
  return carts;
};
