import "@fastify/jwt";
import "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    user: {
      id: string;
      email: string;
      username: string;
      role: "USER" | "ADMIN";
      iat?: number;
      exp?: number;
    };
  }
}
