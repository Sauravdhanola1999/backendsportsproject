import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

import Athlete from "./athlete.model.js";
import Event from "./event.model.js";
import Heat from "./heat.model.js";
import Result from "./result.model.js";
import User from "./user.model.js"

const db = {};

db.sequelize = sequelize;

db.Athlete = Athlete(sequelize, DataTypes);
db.Event = Event(sequelize, DataTypes);
db.Heat = Heat(sequelize, DataTypes);
db.Result = Result(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);


Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
