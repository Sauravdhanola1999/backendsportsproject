import authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class AuthController {
  async signupAdmin(req, res) {
    try {
      const admin = await authService.signupAdmin(req.body);
      const token = authService.generateToken(admin);

      return res.json(
        new ApiResponse(true, "Admin account created", { admin, token })
      );
    } catch (err) {
      return res.status(400).json(new ApiResponse(false, err.message));
    }
  }
}

export default new AuthController();
