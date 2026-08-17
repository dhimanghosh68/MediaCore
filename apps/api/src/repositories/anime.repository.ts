import { prisma } from "../config/database.js";

export const animeRepository = {
  list: (skip = 0, take = 20) =>
    prisma.anime.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        genres: { include: { genre: true } },
        seasons: {
          orderBy: { number: "asc" },
          include: { episodes: { orderBy: { number: "asc" } } },
        },
      },
    }),

  findById: (id: string) =>
    prisma.anime.findUnique({
      where: { id },
      include: {
        genres: { include: { genre: true } },
        seasons: {
          orderBy: { number: "asc" },
          include: {
            episodes: {
              orderBy: { number: "asc" },
              include: { sources: true },
            },
          },
        },
      },
    }),

  findBySlug: (slug: string) =>
    prisma.anime.findUnique({
      where: { slug },
      include: {
        genres: { include: { genre: true } },
        seasons: {
          orderBy: { number: "asc" },
          include: {
            episodes: {
              orderBy: { number: "asc" },
              include: { sources: true },
            },
          },
        },
      },
    }),

  create: (data: any) =>
    prisma.anime.create({
      data,
      include: { genres: { include: { genre: true } } },
    }),

  update: (id: string, data: any) =>
    prisma.anime.update({
      where: { id },
      data,
    }),

  delete: (id: string) =>
    prisma.anime.delete({
      where: { id },
    }),

  count: () => prisma.anime.count(),
};
