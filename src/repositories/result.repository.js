import db from "../models/index.js";
import { Op } from "sequelize";

class ResultRepository {

  createResult(data) {
    return db.Result.create(data);
  }

  getResultsForHeat(heatId) {
    return db.Result.findAll({
      where: { heatId },
      include: [db.Athlete],
      order: [
        // Sort by status first (OK results first), then by finishTime
        // Results with null finishTime will appear last
        [db.sequelize.literal('CASE WHEN status = "OK" THEN 0 ELSE 1 END'), 'ASC'],
        [db.sequelize.literal('CASE WHEN finishTime IS NULL THEN 1 ELSE 0 END'), 'ASC'],
        ["finishTime", "ASC"]
      ],
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
      where: {
        status: "OK"
      },
      include: [
        { model: db.Heat, where: { eventId } },
        db.Athlete
      ],
      order: [
        // Results with finishTime first (sorted by time), then results without finishTime
        [db.sequelize.literal('CASE WHEN finishTime IS NULL THEN 1 ELSE 0 END'), 'ASC'],
        ["finishTime", "ASC"]
      ],
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
