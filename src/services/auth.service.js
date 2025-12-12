import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  async signupAdmin(data) {
    const { name, email, password } = data;
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error("Email already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    return user;
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );
  }
}

export default new AuthService();
