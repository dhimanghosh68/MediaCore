import { prisma } from "../config/database.js";
import { commentRepository } from "../repositories/comment.repository.js";

export const commentService = {
  list: (animeId: string) =>
    commentRepository.listByAnime(animeId),

  create: async (userId: string, data: {
    animeId: string;
    body: string;
    parentId?: string;
  }) => {
    const anime = await prisma.anime.findUnique({
      where: { id: data.animeId },
    });

    if (!anime) {
      throw new Error("Anime not found");
    }

    if (data.parentId) {
      const parent = await commentRepository.findById(data.parentId);

      if (!parent || parent.animeId !== data.animeId) {
        throw new Error("Invalid parent comment");
      }
    }

    return commentRepository.create({
      userId,
      animeId: data.animeId,
      body: data.body,
      parentId: data.parentId,
    });
  },

  update: async (
    userId: string,
    id: string,
    body: string,
  ) => {
    const comment = await commentRepository.findById(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new Error("Forbidden");
    }

    return commentRepository.update(id, body);
  },

  delete: async (userId: string, id: string) => {
    const comment = await commentRepository.findById(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new Error("Forbidden");
    }

    return commentRepository.delete(id);
  },

  like: async (userId: string, commentId: string) => {
    const comment = await commentRepository.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return commentRepository.like(userId, commentId);
  },

  unlike: (userId: string, commentId: string) =>
    commentRepository.unlike(userId, commentId),
};
