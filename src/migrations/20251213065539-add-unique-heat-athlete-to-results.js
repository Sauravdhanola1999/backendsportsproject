"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addConstraint("Results", {
    fields: ["heatId", "athleteId"],
    type: "unique",
    name: "unique_heat_athlete"
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint(
    "Results",
    "unique_heat_athlete"
  );
}
