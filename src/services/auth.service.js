import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";

class AuthService {
  async signupAdmin(data) {
    const { name, email, password } = data;

    const exists = await userRepository.findByEmail(email);
    if (exists) throw new ApiError("AUTH.EMAIL_EXISTS", 400);

    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      password: hashed,
      role: "admin"
    });

    return user;
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError("AUTH.INVALID_CREDENTIALS", 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ApiError("AUTH.INVALID_CREDENTIALS", 401);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    return { user, token };
  }
}

export default new AuthService();
