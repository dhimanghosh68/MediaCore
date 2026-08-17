import { FastifyReply, FastifyRequest } from "fastify";
import { animeService } from "../services/anime.service.js";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const query = request.query as { page?: string; limit?: string };

  return reply.send(
    await animeService.list(
      Number(query.page ?? 1),
      Number(query.limit ?? 20),
    ),
  );
}

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const anime = await animeService.get(id);

  if (!anime) {
    return reply.code(404).send({ message: "Anime not found" });
  }

  return anime;
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(201).send(
    await animeService.create(request.body),
  );
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  return animeService.update(id, request.body);
}

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  await animeService.delete(id);

  return reply.code(204).send();
}
