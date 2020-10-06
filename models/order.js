const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    status: {
      //Order placed, out for delivery, or cancelled
      allowNull: false,
      type: DataTypes.STRING,
    },
    owner: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
