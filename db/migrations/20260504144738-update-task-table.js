'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("Tasks", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });

    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "createdAt");
    await queryInterface.removeColumn("Tasks", "updatedAt");
  }
};
