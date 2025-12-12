"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Results", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    heatId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Heats",
        key: "id"
      },
      onDelete: "CASCADE"
    },

    athleteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Athletes",
        key: "id"
      },
      onDelete: "CASCADE"
    },

    lane: {
      type: Sequelize.INTEGER,
      allowNull: true
    },

    reactionTime: {
      type: Sequelize.FLOAT,
      allowNull: true
    },

    finishTime: {
      type: Sequelize.FLOAT,
      allowNull: true
    },

    status: {
      type: Sequelize.ENUM("OK", "DNS", "DNF", "DSQ"),
      defaultValue: "OK"
    },

    position: {
      type: Sequelize.INTEGER,
      allowNull: true
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Results");
}
