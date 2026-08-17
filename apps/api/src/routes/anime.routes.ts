import { FastifyInstance } from "fastify";
import * as controller from "../controllers/anime.controller.js";

export default async function animeRoutes(app: FastifyInstance) {
  app.get("/", controller.list);
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
}
