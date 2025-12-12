import eventService from "../services/event.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class EventController {
  
  async create(req, res) {
    const event = await eventService.create(req.body);
    return new ApiResponse(true, "EVENT.CREATED", event, 201).send(res);
  }

  async getAll(req, res) {
    const events = await eventService.getAll();
    return new ApiResponse(true, "EVENT.LIST_FETCHED", events).send(res);
  }

  async getById(req, res) {
    const event = await eventService.getById(req.params.id);
    return new ApiResponse(true, "EVENT.FETCHED", event).send(res);
  }

  async update(req, res) {
    const event = await eventService.update(req.params.id, req.body);
    return new ApiResponse(true, "EVENT.UPDATED", event).send(res);
  }

  async delete(req, res) {
    await eventService.delete(req.params.id);
    return new ApiResponse(true, "EVENT.DELETED").send(res);
  }

  async getDetails(req, res) {
    const event = await eventService.getDetails(req.params.id);
    return new ApiResponse(true, "EVENT.DETAILS_FETCHED", event).send(res);
  }
}

export default new EventController();
