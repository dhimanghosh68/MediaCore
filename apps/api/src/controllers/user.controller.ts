import { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "../services/user.service.js";

export async function me(request: FastifyRequest) {
  const user = request.user as { id: string };
  return userService.get(user.id);
}

export async function list() {
  return userService.list();
}

export async function update(request: FastifyRequest) {
  const user = request.user as { id: string };
  return userService.update(user.id, request.body);
}
