import { prisma } from "../config/database.js";

export const commentRepository = {
  listByAnime: (animeId: string) =>
    prisma.comment.findMany({
      where: {
        animeId,
        parentId: null,
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        replies: {
          where: { isDeleted: false },
          orderBy: { createdAt: "asc" },
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        _count: {
          select: { likes: true },
        },
      },
    }),

  findById: (id: string) =>
    prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    }),

  create: (data: any) =>
    prisma.comment.create({
      data,
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
    }),

  update: (id: string, body: string) =>
    prisma.comment.update({
      where: { id },
      data: { body },
    }),

  delete: (id: string) =>
    prisma.comment.update({
      where: { id },
      data: { isDeleted: true },
    }),

  like: (userId: string, commentId: string) =>
    prisma.commentLike.create({
      data: { userId, commentId },
    }),

  unlike: (userId: string, commentId: string) =>
    prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    }),
};
