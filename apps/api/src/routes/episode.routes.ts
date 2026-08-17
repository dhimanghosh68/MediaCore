import { FastifyInstance } from "fastify";
import * as controller from "../controllers/episode.controller.js";

export default async function episodeRoutes(app: FastifyInstance) {
  app.get("/season/:seasonId", controller.list);
  app.get("/:id", controller.get);

  app.post(
    "/",
    { preHandler: [app.authenticate] },
    controller.create,
  );

  app.patch(
    "/:id",
    { preHandler: [app.authenticate] },
    controller.update,
  );

  app.delete(
    "/:id",
    { preHandler: [app.authenticate] },
    controller.remove,
  );

  app.post(
    "/source",
    { preHandler: [app.authenticate] },
    controller.addSource,
  );

  app.delete(
    "/source/:id",
    { preHandler: [app.authenticate] },
    controller.removeSource,
  );
}
