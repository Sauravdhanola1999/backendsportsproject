import athleteService from "../services/athlete.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class AthleteController {
  async create(req, res) {
    const athlete = await athleteService.create(req.body);
    return new ApiResponse(true, "ATHLETE.CREATED", athlete, 201).send(res);
  }

  async getAll(req, res) {
    const athletes = await athleteService.findAll();
    return new ApiResponse(true, "ATHLETE.LIST_FETCHED", athletes, 200).send(
      res
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const athlete = await athleteService.findById(id);
    return new ApiResponse(true, "ATHLETE.FETCHED", athlete, 200).send(res);
  }

  async update(req, res) {
    const { id } = req.params;
    const updated = await athleteService.update(id, req.body);
    return new ApiResponse(true, "ATHLETE.UPDATED", updated, 200).send(res);
  }

  async delete(req, res) {
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
  }
}

export default new AthleteController();
