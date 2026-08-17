import { prisma } from "../config/database.js";
import { episodeRepository } from "../repositories/episode.repository.js";

export const episodeService = {
  list: (seasonId: string) => episodeRepository.listBySeason(seasonId),

  get: (id: string) => episodeRepository.findById(id),

  create: async (data: any) => {
    const season = await prisma.season.findUnique({
      where: { id: data.seasonId },
    });

    if (!season) {
      throw new Error("Season not found");
    }

    return episodeRepository.create(data);
  },

  update: (id: string, data: any) =>
    episodeRepository.update(id, data),

  delete: (id: string) =>
    episodeRepository.delete(id),

  addSource: (data: any) =>
    episodeRepository.addSource(data),

  deleteSource: (id: string) =>
    episodeRepository.deleteSource(id),
};
