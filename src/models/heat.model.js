export default (sequelize, DataTypes) => {
  const Heat = sequelize.define(
    "Heat",
    {
      heatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      round: {
        type: DataTypes.ENUM("HEAT", "SEMI", "FINAL"),
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "id"
        },
        onDelete: "CASCADE"
      }
    },
    {
      tableName: "Heats"
    }
  );

  Heat.associate = (models) => {
    Heat.belongsTo(models.Event, { foreignKey: "eventId" });
    Heat.hasMany(models.Result, { foreignKey: "heatId" });
  };

  return Heat;
};
