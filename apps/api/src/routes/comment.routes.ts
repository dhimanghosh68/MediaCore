import { FastifyInstance } from "fastify";
import * as controller from "../controllers/comment.controller.js";

export default async function commentRoutes(app: FastifyInstance) {
  app.get("/anime/:animeId", controller.list);

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
    "/:id/like",
    { preHandler: [app.authenticate] },
    controller.like,
  );

  app.delete(
    "/:id/like",
    { preHandler: [app.authenticate] },
    controller.unlike,
  );
}
