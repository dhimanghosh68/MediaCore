import { prisma } from "../config/database.js";

export const adminService = {
  dashboard: async () => {
    const [
      users,
      anime,
      episodes,
      comments,
      favorites,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.anime.count(),
      prisma.episode.count(),
      prisma.comment.count({
        where: { isDeleted: false },
      }),
      prisma.favorite.count(),
    ]);

    return {
      users,
      anime,
      episodes,
      comments,
      favorites,
    };
  },

  setUserRole: async (
    userId: string,
    role: "USER" | "ADMIN",
  ) =>
    prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    }),
};
