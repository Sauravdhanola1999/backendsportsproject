import db from "../models/index.js";

class ResultRepository {

  createResult(data) {
    return db.Result.create(data);
  }

  getResultsForHeat(heatId) {
    return db.Result.findAll({
      where: { heatId },
      include: [db.Athlete],
      order: [["finishTime", "ASC"]],
    });
  }

  async findByHeatAndAthlete(heatId, athleteId) {
  return db.Result.findOne({
    where: { heatId, athleteId }
  });
}


  updateResult(id, data) {
    return db.Result.update(data, { where: { id } });
  }

  findById(id) {
    return db.Result.findByPk(id);
  }

  getLeaderBoard(eventId) {
    return db.Result.findAll({
      include: [
        { model: db.Heat, where: { eventId } },
        db.Athlete
      ],
      order: [["finishTime", "ASC"]],
    });
  }

  async findByEventHeatAndAthlete(eventId, heatId, athleteId) {
    return db.Result.findOne({
      where: { heatId, athleteId },
      include: [
        {
          model: db.Heat,
          where: { eventId },
          attributes: ["id", "eventId", "heatNumber", "round"]
        }
      ]
    });
  }

  async updateByEventHeatAndAthlete(eventId, heatId, athleteId, data) {
    const result = await this.findByEventHeatAndAthlete(eventId, heatId, athleteId);
    if (!result) {
      return null;
    }
    await db.Result.update(data, {
      where: { id: result.id }
    });
    return db.Result.findByPk(result.id);
  }
}

export default new ResultRepository();
