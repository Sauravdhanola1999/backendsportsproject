import db from "../models/index.js";

class HeatRepository {
  async create(data) {
    return db.Heat.create(data);
  }

  async findByEvent(eventId) {
    return db.Heat.findAll({
      where: { eventId },
      include: [
        {
          model: db.Result,
          attributes: ["id", "athleteId", "finishTime", "status"],
        },
      ],
      order: [["heatNumber", "ASC"]],
    });
  }

   async update(id, data) {
    await db.Heat.update(data, { where: { id } });
    return this.findById(id); // return updated heat with relations
  }

  async findById(id) {
    return db.Heat.findByPk(id, {
      include: [
        {
          model: db.Event,
          attributes: ["id", "eventName", "category", "distance"],
        },
        {
          model: db.Result,
          attributes: ["id", "athleteId", "finishTime", "status", "lane"],
        },
      ],
    });
  }

  async findAll() {
    return db.Heat.findAll({
      include: [db.Event],
    });
  }

  async delete(id) {
    return db.Heat.destroy({ where: { id } });
  }
}

export default new HeatRepository();
