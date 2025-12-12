import db from "../models/index.js";

class AthleteRepository {
  async create(data) {
    const created = await db.Athlete.create(data);
    return db.Athlete.findByPk(created.id, {
      attributes: [
        "id",
        "name",
        "country",
        "age",
        "gender",
        "personalBest",
        "seasonBest",
      ],
    });
  }

  async findAll() {
    return db.Athlete.findAll({
      attributes: [
        "id",
        "name",
        "country",
        "age",
        "gender",
        "personalBest",
        "seasonBest",
      ],
    });
  }

  async findById(id) {
    return db.Athlete.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "country",
        "age",
        "gender",
        "personalBest",
        "seasonBest",
      ],
    });
  }

  async update(id, data) {
    await db.Athlete.update(data, { where: { id } });
    return db.Athlete.findByPk(id, {
      attributes: ["id", "name", "country", "age"],
    });
  }

  async delete(id) {
    return db.Athlete.update(
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {
        where: { id },
      }
    );
  }
}

export default new AthleteRepository();
