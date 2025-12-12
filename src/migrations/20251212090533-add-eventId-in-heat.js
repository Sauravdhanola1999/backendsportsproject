"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("Heats", "eventId", {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Events",
      key: "id"
    },
    onDelete: "CASCADE"
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("Heats", "eventId", {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: "Events",
      key: "id"
    }
  });
}
