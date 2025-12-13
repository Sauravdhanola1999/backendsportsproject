import resultService from "../services/result.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

class ResultController {

  async create(req, res) {
    try {
      const result = await resultService.createResult(req.body);
      return new ApiResponse(true, "RESULT.CREATED", result, 201).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async getHeatResults(req, res) {
    try {
      const results = await resultService.getHeatResults(req.params.heatId);
      return new ApiResponse(true, "RESULT.BY_HEAT_FETCHED", results).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async update(req, res) {
    try {
      const updated = await resultService.updateResult(req.params.id, req.body);
      return new ApiResponse(true, "RESULT.UPDATED", updated).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async leaderboard(req, res) {
    try {
      const leaderboard = await resultService.getLeaderboard(req.params.eventId);
      return new ApiResponse(true, "RESULT.LEADERBOARD_FETCHED", leaderboard).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async updateByEventHeatAndAthlete(req, res) {
    try {
      const { eventId, heatId, athleteId } = req.params;
      const updated = await resultService.updateResultByEventHeatAndAthlete(
        parseInt(eventId),
        parseInt(heatId),
        parseInt(athleteId),
        req.body
      );
      return new ApiResponse(true, "RESULT.UPDATED", updated, 200).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }
}

export default new ResultController();
