import { animeRepository } from "../repositories/anime.repository.js";

export const animeService = {
  list: async (page = 1, limit = 20) => {
    const take = Math.min(Math.max(limit, 1), 100);
    const skip = (Math.max(page, 1) - 1) * take;

    const [items, total] = await Promise.all([
      animeRepository.list(skip, take),
      animeRepository.count(),
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

  get: async (idOrSlug: string) => {
    return (
      (await animeRepository.findBySlug(idOrSlug)) ??
      (await animeRepository.findById(idOrSlug))
    );
  },

  create: (data: any) => animeRepository.create(data),

  update: (id: string, data: any) => animeRepository.update(id, data),

  delete: (id: string) => animeRepository.delete(id),
};
