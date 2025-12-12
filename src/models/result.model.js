export default (sequelize, DataTypes) => {
  const Result = sequelize.define("Result", {
    lane: DataTypes.INTEGER,
    reactionTime: DataTypes.FLOAT,
    finishTime: DataTypes.FLOAT,
    status: DataTypes.ENUM("OK", "DNS", "DNF", "DSQ"),
    position: DataTypes.INTEGER,
  });

  Result.associate = (models) => {
    Result.belongsTo(models.Heat, { foreignKey: "heatId" });
    Result.belongsTo(models.Athlete, { foreignKey: "athleteId" });
  };

  return Result;
};
