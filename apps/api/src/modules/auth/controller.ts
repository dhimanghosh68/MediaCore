import { FastifyReply, FastifyRequest } from "fastify";
import * as authService from "./service.js";

export async function health() {
  return {
    module: "auth",
    status: "working",
  };
}

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return authService.register(request, reply);
}

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return authService.login(request, reply);
}

export async function me(request: FastifyRequest) {
  return request.user;
}
