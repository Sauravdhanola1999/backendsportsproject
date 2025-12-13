import resultRepository from "../repositories/result.repository.js";
import heatRepository from "../repositories/heat.repository.js";
import { autoRank } from "../utils/rankingLogic.js";
import { emitLeaderboardDebounced } from "../sockets/socket.js";
import ApiError from "../utils/ApiError.js";
import db from "../models/index.js";

class ResultService {

  async createResult(data) {
  const heat = await heatRepository.findById(data.heatId);
  if (!heat) throw new ApiError("HEAT.NOT_FOUND", 404);

  const athlete = await db.Athlete.findByPk(data.athleteId);
  if (!athlete) throw new ApiError("ATHLETE.NOT_FOUND", 404);

  // 🔑 FIND EXISTING RESULT
  let result = await resultRepository.findByHeatAndAthlete(
    data.heatId,
    data.athleteId
  );

  if (result) {
    // 🔁 UPDATE
    await resultRepository.updateResult(result.id, data);
  } else {
    // ➕ CREATE (only once)
    result = await resultRepository.createResult(data);
  }

  const leaderboard = await this.getLeaderboard(heat.eventId);

  // 🔥 Emit ONLY updated result (not full list)
  emitLeaderboardDebounced(heat.eventId, leaderboard);

  return result;
}


  async updateResult(id, data) {
    const result = await resultRepository.findById(id);
    if (!result) throw new ApiError("RESULT.NOT_FOUND", 404);

    await resultRepository.updateResult(id, data);

    const heat = await heatRepository.findById(result.heatId);
    const leaderboard = await this.getLeaderboard(heat.eventId);

    emitLeaderboardDebounced(heat.eventId, leaderboard);

    return { updated: true };
  }

  async getHeatResults(heatId) {
    return resultRepository.getResultsForHeat(heatId);
  }

  async getLeaderboard(eventId) {
    const results = await resultRepository.getLeaderBoard(eventId);
    return autoRank(results);
  }

  async updateResultByEventHeatAndAthlete(eventId, heatId, athleteId, data) {
    // Validate heat belongs to event
    const heat = await heatRepository.findById(heatId);
    if (!heat) {
      throw new ApiError("HEAT.NOT_FOUND", 404);
    }
    if (heat.eventId !== parseInt(eventId)) {
      throw new ApiError("HEAT.DOES_NOT_BELONG_TO_EVENT", 400);
    }

    // Validate athlete exists
    const athlete = await db.Athlete.findByPk(athleteId);
    if (!athlete) {
      throw new ApiError("ATHLETE.NOT_FOUND", 404);
    }

    // Update or create result
    let result = await resultRepository.findByEventHeatAndAthlete(eventId, heatId, athleteId);
    
    if (result) {
      // Update existing result
      await resultRepository.updateByEventHeatAndAthlete(eventId, heatId, athleteId, data);
      result = await resultRepository.findByEventHeatAndAthlete(eventId, heatId, athleteId);
    } else {
      // Create new result if it doesn't exist
      result = await resultRepository.createResult({
        athleteId,
        heatId,
        ...data
      });
    }

    const leaderboard = await this.getLeaderboard(eventId);
    emitLeaderboardDebounced(eventId, leaderboard);

    return result;
  }
}

export default new ResultService();
