import db from "../models/index.js";

class UserRepository {
  create(data) {
    return db.User.create(data);
  }

  findByEmail(email) {
    return db.User.findOne({ where: { email } });
  }
}

export default new UserRepository();
