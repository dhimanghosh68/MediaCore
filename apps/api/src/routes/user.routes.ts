import { FastifyInstance } from "fastify";
import * as controller from "../controllers/user.controller.js";

export default async function userRoutes(app: FastifyInstance) {
  app.get(
    "/me",
    { preHandler: [app.authenticate] },
    controller.me,
  );

  app.patch(
    "/me",
    { preHandler: [app.authenticate] },
    controller.update,
  );

  app.get(
    "/",
    { preHandler: [app.authenticate] },
    controller.list,
  );
}
