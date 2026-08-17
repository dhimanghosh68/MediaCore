import { prisma } from "../config/database.js";

export const authRepository = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
    }),

  findByUsername: (username: string) =>
    prisma.user.findUnique({
      where: { username },
    }),

  createUser: (data: {
    email: string;
    username: string;
    password: string;
  }) =>
    prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    }),
};
