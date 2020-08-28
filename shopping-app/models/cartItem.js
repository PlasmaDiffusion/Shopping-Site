const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("cartItem", {
    //An item in the cart that references a shop item
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    shopItemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    amountInCart: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
};
