import athleteService from "../services/athlete.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

class AthleteController {
  async create(req, res) {
    try {
      const athlete = await athleteService.create(req.body);
      return new ApiResponse(true, "ATHLETE.CREATED", athlete, 201).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async getAll(req, res) {
    try {
      const athletes = await athleteService.findAll();
      return new ApiResponse(true, "ATHLETE.LIST_FETCHED", athletes, 200).send(
        res
      );
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const athlete = await athleteService.findById(id);
      if (!athlete) {
        return new ApiError("ATHLETE.NOT_FOUND", 404).send(res);
      }
      return new ApiResponse(true, "ATHLETE.FETCHED", athlete, 200).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await athleteService.update(id, req.body);
      return new ApiResponse(true, "ATHLETE.UPDATED", updated, 200).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await athleteService.delete(id);
      return new ApiResponse(
        true,
        "ATHLETE.DELETED",
        {
          id: Number(id),
          isDeleted: true,
        },
        200
      ).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }

  async getByEventAndHeat(req, res) {
    try {
      const { eventId, heatId } = req.params;
      const athletes = await athleteService.findByEventAndHeat(
        parseInt(eventId),
        parseInt(heatId)
      );
      return new ApiResponse(
        true,
        "ATHLETE.BY_EVENT_HEAT_FETCHED",
        athletes,
        200
      ).send(res);
    } catch (error) {
      return new ApiError(error.message, error.statusCode || 500).send(res);
    }
  }
}

export default new AthleteController();
