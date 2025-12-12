import db from "../models/index.js";

class EventRepository {
  async create(data) {
    const created = await db.Event.create(data);

    return await db.Event.findByPk(created.id, {
      attributes: ["id", "eventName", "category", "distance"],
    });
  }

  async findAll() {
    return db.Event.findAll({
      where: { isDeleted: false },
      attributes: ["id", "eventName", "category", "distance"],
    });
  }

  async findById(id) {
    return db.Event.findOne({
      where: { id, isDeleted: false },
      attributes: ["id", "eventName", "category", "distance"],
    });
  }

  async update(id, data) {
    await db.Event.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return db.Event.update(
      { isDeleted: true, deletedAt: new Date() },
      { where: { id } }
    );
  }

  async getEventDetails(eventId) {
    return db.Event.findByPk(eventId, {
      include: [
        {
          model: db.Heat,
          attributes: ["id", "heatNumber", "round"],
        },
      ],
      attributes: ["id", "eventName", "category", "distance"],
    });
  }
}

export default new EventRepository();
