import heatRepository from "../repositories/heat.repository.js";
import ApiError from "../utils/ApiError.js";

class HeatService {
  async create(data) {
    return heatRepository.create(data);
  }

  async findByEvent(eventId) {
    return heatRepository.findByEvent(eventId);
  }

  async update(id, data) {
    const heat = await heatRepository.findById(id);

    if (!heat) {
      throw new ApiError("HEAT.NOT_FOUND", 404);
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError("HEAT.NO_FIELDS_TO_UPDATE", 400);
    }

    return heatRepository.update(id, data);
  }

  async findById(id) {
    const heat = await heatRepository.findById(id);
    if (!heat) {
      throw new ApiError("HEAT.NOT_FOUND", 404);
    }
    return heat;
  }

  async delete(id) {
    return heatRepository.delete(id);
  }

  async findAll() {
    return heatRepository.findAll();
  }
}

export default new HeatService();
