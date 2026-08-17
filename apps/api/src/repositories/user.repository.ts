import { prisma } from "../config/database.js";

export const userRepository = {
  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),

  findByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
    }),

  findByUsername: (username: string) =>
    prisma.user.findUnique({
      where: { username },
    }),

  list: () =>
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),

  update: (id: string, data: any) =>
    prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
};
