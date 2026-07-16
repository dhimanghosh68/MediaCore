import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";

export async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  await app.register(prismaPlugin);

  app.get("/", async () => {
    return {
      name: "MediaCore API",
      version: "1.0.0",
      status: "running",
    };
  });

  app.get("/users", async (request) => {
  return request.server.prisma.user.findMany();
});

app.post("/seed", async (request) => {
  return request.server.prisma.user.create({
    data: {
      email: "admin@example.com",
      username: "admin",
      password: "password123",
    },
  });
});

  return app;
}