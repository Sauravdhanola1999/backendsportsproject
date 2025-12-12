import heatService from "../services/heat.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class HeatController {
  
  async create(req, res) {
    const heat = await heatService.create(req.body);
    return new ApiResponse(true, "HEAT.CREATED", heat, 201).send(res);
  }

  async getByEvent(req, res) {
    const eventId = req.params.eventId;
    const heats = await heatService.findByEvent(eventId);
    return new ApiResponse(true, "HEAT.LIST_FETCHED", heats).send(res);
  }

  async getById(req, res) {
    const heat = await heatService.findById(req.params.id);
    return new ApiResponse(true, "HEAT.FETCHED", heat).send(res);
  }

  async getAll(req, res) {
    const heats = await heatService.findAll();
    return new ApiResponse(true, "HEAT.LIST_FETCHED", heats).send(res);
  }

  async delete(req, res) {
    await heatService.delete(req.params.id);
    return new ApiResponse(true, "HEAT.DELETED").send(res);
  }
}

export default new HeatController();
