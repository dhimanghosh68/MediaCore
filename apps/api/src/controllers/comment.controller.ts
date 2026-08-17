import { FastifyReply, FastifyRequest } from "fastify";
import { commentService } from "../services/comment.service.js";

export async function list(request: FastifyRequest) {
  const { animeId } = request.params as { animeId: string };
  return commentService.list(animeId);
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { id: string };

  return reply.code(201).send(
    await commentService.create(user.id, request.body as any),
  );
}

export async function update(request: FastifyRequest) {
  const user = request.user as { id: string };
  const { id } = request.params as { id: string };
  const body = (request.body as { body: string }).body;

  return commentService.update(user.id, id, body);
}

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { id: string };
  const { id } = request.params as { id: string };

  await commentService.delete(user.id, id);

  return reply.code(204).send();
}

export async function like(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { id: string };
  const { id } = request.params as { id: string };

  return reply.code(201).send(
    await commentService.like(user.id, id),
  );
}

export async function unlike(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { id: string };
  const { id } = request.params as { id: string };

  await commentService.unlike(user.id, id);

  return reply.code(204).send();
}
