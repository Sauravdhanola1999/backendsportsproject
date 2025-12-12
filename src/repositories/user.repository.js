import db from "../models/index.js";

class UserRepository {
  create(data) {
    return db.User.create(data);
  }

  findByEmail(email) {
    return db.User.findOne({ where: { email } });
  }

  findById(id) {
    return db.User.findByPk(id);
  }
}

export default new UserRepository();
