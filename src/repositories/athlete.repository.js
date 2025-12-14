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

  async findByEventAndHeat(eventId, heatId) {
    return db.Athlete.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: db.Result,
          where: { heatId },
          required: true,
          include: [
            {
              model: db.Heat,
              where: { eventId },
              required: true,
              attributes: ["id", "eventId", "heatNumber", "round"]
            }
          ],
          attributes: ["id", "lane", "reactionTime", "finishTime", "status", "position"]
        }
      ],
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
}

export default new AthleteRepository();
