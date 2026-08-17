import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./modules/auth/routes.js";
import routes from "./routes/index.js";

export async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(authPlugin);

  app.get("/", async () => ({
    name: "MediaCore API",
    version: "1.0.0",
    status: "running",
  }));

  app.get("/health", async () => ({
    status: "ok",
    service: "mediacore-api",
  }));

  await app.register(authRoutes, {
    prefix: "/auth",
  });

  await app.register(routes, {
    prefix: "/api",
  });

  return app;
}
