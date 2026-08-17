import { prisma } from "../config/database.js";

export const searchService = {
  search: async (query: string, page = 1, limit = 20) => {
    const take = Math.min(Math.max(limit, 1), 100);
    const skip = (Math.max(page, 1) - 1) * take;

    const where = {
      OR: [
        { title: { contains: query, mode: "insensitive" as const } },
        { synopsis: { contains: query, mode: "insensitive" as const } },
        {
          genres: {
            some: {
              genre: {
                name: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
            },
          },
        },
      ],
    };

    const [items, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        skip,
        take,
        orderBy: [
          { averageRating: "desc" },
          { viewCount: "desc" },
        ],
        include: {
          genres: {
            include: { genre: true },
          },
        },
      }),
      prisma.anime.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page: Math.max(page, 1),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    };
  },
};
