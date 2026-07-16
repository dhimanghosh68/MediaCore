import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import authRoutes from "./modules/auth/routes.js";
import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";


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


  await app.register(jwtPlugin);
  
  await app.register(authPlugin);
  
  await app.register(authRoutes, {
    prefix: "/auth",
  });

  app.get(
  "/me",
  {
    preHandler: [app.authenticate],
  },
  async (request) => {
    return request.user;
  },
);

  return app;
}