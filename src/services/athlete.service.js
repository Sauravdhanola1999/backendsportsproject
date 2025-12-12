import db from "../models/index.js";
import athleteRepository from "../repositories/athlete.repository.js";

class AthleteService {
  create(data) {
    return athleteRepository.create(data);
  }

  findAll() {
    return db.Athlete.findAll({
      where: { isDeleted: false },
      attributes: ["id", "name", "country"],
    });
  }

  findById(id) {
    return db.Athlete.findOne({
      where: {
        id,
        isDeleted: false,
      },
      attributes: ["id", "name", "country"],
    });
  }

  update(id, data) {
    return athleteRepository.update(id, data);
  }

  delete(id) {
    return athleteRepository.delete(id);
  }
}

export default new AthleteService();
