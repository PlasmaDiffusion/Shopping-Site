const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("cart", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    owner: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
