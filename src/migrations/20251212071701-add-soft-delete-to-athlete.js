"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Athletes", "isDeleted", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn("Athletes", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Athletes", "isDeleted");
    await queryInterface.removeColumn("Athletes", "deletedAt");
  },
};
