import { prisma } from "../config/database.js";

export const episodeRepository = {
  findById: (id: string) =>
    prisma.episode.findUnique({
      where: { id },
      include: {
        season: { include: { anime: true } },
        sources: true,
      },
    }),

  listBySeason: (seasonId: string) =>
    prisma.episode.findMany({
      where: { seasonId },
      orderBy: { number: "asc" },
      include: { sources: true },
    }),

  create: (data: any) =>
    prisma.episode.create({
      data,
      include: { sources: true },
    }),

  update: (id: string, data: any) =>
    prisma.episode.update({
      where: { id },
      data,
      include: { sources: true },
    }),

  delete: (id: string) =>
    prisma.episode.delete({
      where: { id },
    }),

  addSource: (data: any) =>
    prisma.episodeSource.create({ data }),

  deleteSource: (id: string) =>
    prisma.episodeSource.delete({
      where: { id },
    }),
};
