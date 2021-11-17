"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      ID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Emoji: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
