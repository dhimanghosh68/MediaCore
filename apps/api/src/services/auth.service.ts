import bcrypt from "bcrypt";
import { authRepository } from "../repositories/auth.repository.js";

export const authService = {
  register: async (
    email: string,
    username: string,
    password: string,
  ) => {
    const existing = await authRepository.findByEmail(email);

    if (existing) {
      throw new Error("Email or username already exists");
    }

    const usernameExists =
      await authRepository.findByUsername(username);

    if (usernameExists) {
      throw new Error("Email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return authRepository.createUser({
      email,
      username,
      password: hashedPassword,
    });
  },

  verifyPassword: async (
    password: string,
    hash: string,
  ) => bcrypt.compare(password, hash),
};
