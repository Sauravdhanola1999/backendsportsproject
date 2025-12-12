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
}

export default new ResultRepository();
