import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import authService from "../services/auth.service.js";

class AuthController {
  async signupAdmin(req, res) {
    try {
      const admin = await authService.signupAdmin(req.body);
      return new ApiResponse(true, "AUTH.ADMIN_CREATED", admin).send(res);
    } catch (err) {
      if (err instanceof ApiError) return err.send(res);
      return new ApiError("COMMON.SERVER_ERROR", 500).send(res);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);

      return new ApiResponse(true, "AUTH.LOGIN_SUCCESS", data).send(res);
    } catch (err) {
      if (err instanceof ApiError) return err.send(res);
      return new ApiError("COMMON.SERVER_ERROR", 500).send(res);
    }
  }
}

export default new AuthController();
