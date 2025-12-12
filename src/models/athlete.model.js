export default (sequelize, DataTypes) => {
  const Athlete = sequelize.define(
    "Athlete",
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.ENUM("M", "F", "O"),
      personalBest: DataTypes.FLOAT,
      seasonBest: DataTypes.FLOAT,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "Athletes" 
    }
  );

  Athlete.associate = (models) => {
    Athlete.hasMany(models.Result, { foreignKey: "athleteId" });
  };

  return Athlete;
};
