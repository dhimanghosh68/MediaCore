import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./modules/auth/routes.js";

export async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(authPlugin);

  app.get("/", async () => {
    return {
      name: "MediaCore API",
      version: "1.0.0",
      status: "running",
    };
  });

  app.get("/users", async (request) => {
    return request.server.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  await app.register(authRoutes, {
    prefix: "/auth",
  });

  return app;
}
