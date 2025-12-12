export default (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      tableName: "Events"
    }
  );

  Event.associate = (models) => {
    Event.hasMany(models.Heat, { foreignKey: "eventId", onDelete: "CASCADE" });
  };

  return Event;
};
