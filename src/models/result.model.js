export default (sequelize, DataTypes) => {
  const Result = sequelize.define(
    "Result",
    {
      lane: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      reactionTime: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      finishTime: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM("OK", "DNS", "DNF", "DSQ"),
        defaultValue: "OK"
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: "Results",
      timestamps: true
    }
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Heat, {
      foreignKey: {
        name: "heatId",
        allowNull: false
      },
      onDelete: "CASCADE"
    });

    Result.belongsTo(models.Athlete, {
      foreignKey: {
        name: "athleteId",
        allowNull: false
      },
      onDelete: "CASCADE"
    });
  };

  return Result;
};
