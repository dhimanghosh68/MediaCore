import { FastifyInstance } from "fastify";
import animeRoutes from "./anime.routes.js";
import episodeRoutes from "./episode.routes.js";
import commentRoutes from "./comment.routes.js";
import playerRoutes from "./player.routes.js";
import searchRoutes from "./search.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";

export default async function routes(app: FastifyInstance) {
  await app.register(animeRoutes, {
    prefix: "/anime",
  });

  await app.register(episodeRoutes, {
    prefix: "/episodes",
  });

  await app.register(commentRoutes, {
    prefix: "/comments",
  });

  await app.register(playerRoutes, {
    prefix: "/player",
  });

  await app.register(searchRoutes, {
    prefix: "/search",
  });

  await app.register(userRoutes, {
    prefix: "/users",
  });

  await app.register(adminRoutes, {
    prefix: "/admin",
  });
}
