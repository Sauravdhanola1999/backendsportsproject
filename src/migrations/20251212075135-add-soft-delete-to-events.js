"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Events", "isDeleted", {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  });

  await queryInterface.addColumn("Events", "deletedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Events", "isDeleted");
  await queryInterface.removeColumn("Events", "deletedAt");
}
