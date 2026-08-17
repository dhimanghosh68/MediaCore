import { FastifyReply, FastifyRequest } from "fastify";
import { episodeService } from "../services/episode.service.js";

export async function list(request: FastifyRequest) {
  const { seasonId } = request.params as { seasonId: string };
  return episodeService.list(seasonId);
}

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const episode = await episodeService.get(id);

  if (!episode) {
    return reply.code(404).send({ message: "Episode not found" });
  }

  return episode;
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(201).send(
    await episodeService.create(request.body),
  );
}

export async function update(request: FastifyRequest) {
  const { id } = request.params as { id: string };
  return episodeService.update(id, request.body);
}

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  await episodeService.delete(id);
  return reply.code(204).send();
}

export async function addSource(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.code(201).send(
    await episodeService.addSource(request.body),
  );
}

export async function removeSource(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };
  await episodeService.deleteSource(id);
  return reply.code(204).send();
}
