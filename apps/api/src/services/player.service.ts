import { prisma } from "../config/database.js";

export const playerService = {
  getEpisode: async (episodeId: string) => {
    return prisma.episode.findUnique({
      where: { id: episodeId },
      include: {
        season: {
          include: {
            anime: true,
          },
        },
        sources: {
          orderBy: [
            { isDefault: "desc" },
            { quality: "desc" },
          ],
        },
      },
    });
  },
};
