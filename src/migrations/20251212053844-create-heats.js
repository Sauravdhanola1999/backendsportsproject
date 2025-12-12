'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Heats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      heatNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      round: {
        type: Sequelize.ENUM("HEAT", "SEMI", "FINAL"),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Heats');
  }
};
