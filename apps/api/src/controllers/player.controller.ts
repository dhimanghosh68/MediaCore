import { FastifyReply, FastifyRequest } from "fastify";
import { playerService } from "../services/player.service.js";

export async function episode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };

  const result = await playerService.getEpisode(id);

  if (!result) {
    return reply.code(404).send({
      message: "Episode not found",
    });
  }

  return result;
}
