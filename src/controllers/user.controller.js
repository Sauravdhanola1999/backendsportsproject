import userService from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class UserController {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getUsers();
      return new ApiResponse(
        true,
        "USER.FETCH_SUCCESS",
        users,
        200
      ).send(res);
    } catch (error) {
      console.error(error);
      return new ApiError("USER.FETCH_FAILED", 500).send(res);
    }
  }

  async getOne(req, res) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  }

  async update(req, res) {
    await userService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated" });
  }

  async delete(req, res) {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  }
}

export default new UserController();
