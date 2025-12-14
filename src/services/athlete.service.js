import db from "../models/index.js";
import athleteRepository from "../repositories/athlete.repository.js";
import resultRepository from "../repositories/result.repository.js";
import heatRepository from "../repositories/heat.repository.js";
import ApiError from "../utils/ApiError.js";

class AthleteService {
  async create(data) {
    // Extract eventId, heatId, and lane from data
    const { eventId, heatId, lane, ...athleteData } = data;

    // Validate that heat belongs to the event
    if (eventId && heatId) {
      const heat = await heatRepository.findById(heatId);
      if (!heat) {
        throw new ApiError("HEAT.NOT_FOUND", 404);
      }
      if (heat.eventId !== parseInt(eventId)) {
        throw new ApiError("HEAT.DOES_NOT_BELONG_TO_EVENT", 400);
      }
    }

    // Create athlete
    const athlete = await athleteRepository.create(athleteData);

    // Create result entry if eventId and heatId are provided
    if (eventId && heatId) {
      await resultRepository.createResult({
        athleteId: athlete.id,
        heatId: parseInt(heatId),
        lane: lane || null,
        status: "OK"
      });
    }

    return athlete;
  }

  findAll() {
    return db.Athlete.findAll({
      where: { isDeleted: false },
      attributes: ["id", "name", "country", "age", "gender"],
    });
  }

  findById(id) {
    return db.Athlete.findOne({
      where: {
        id,
        isDeleted: false,
      },
      attributes: ["id", "name", "country", "age", "gender"],
    });
  }

  async update(id, data) {
    // Check if athlete exists
    const athlete = await athleteRepository.findById(id);
    if (!athlete || athlete.isDeleted) {
      throw new ApiError("ATHLETE.NOT_FOUND", 404);
    }

    // Extract eventId, heatId, and lane if provided (but we don't update result assignment via athlete update)
    // These fields should be updated via result endpoints instead
    const { eventId, heatId, lane, ...athleteData } = data;
    
    // If someone tries to update event/heat via athlete update, we ignore those fields
    // and only update athlete information
    const updated = await athleteRepository.update(id, athleteData);
    return updated;
  }

  async delete(id) {
    // Check if athlete exists
    const athlete = await athleteRepository.findById(id);
    if (!athlete) {
      throw new ApiError("ATHLETE.NOT_FOUND", 404);
    }
    if (athlete.isDeleted) {
      throw new ApiError("ATHLETE.ALREADY_DELETED", 400);
    }
    return athleteRepository.delete(id);
  }

  async findByEventAndHeat(eventId, heatId) {
    // Validate that heat belongs to the event
    const heat = await heatRepository.findById(heatId);
    if (!heat) {
      throw new ApiError("HEAT.NOT_FOUND", 404);
    }
    if (heat.eventId !== parseInt(eventId)) {
      throw new ApiError("HEAT.DOES_NOT_BELONG_TO_EVENT", 400);
    }

    // Get all athletes assigned to this event and heat
    return athleteRepository.findByEventAndHeat(eventId, heatId);
  }
}

export default new AthleteService();
