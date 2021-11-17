"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      ID: { type: DataTypes.STRING, primaryKey: true },
      Name: DataTypes.STRING,
      password: DataTypes.STRING,
      Phone: DataTypes.STRING,
      Address: DataTypes.STRING,
      Emoji: DataTypes.STRING,
      Email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return User;
};
