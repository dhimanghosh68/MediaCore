import { FastifyInstance } from "fastify";
import * as controller from "../controllers/player.controller.js";

export default async function playerRoutes(app: FastifyInstance) {
  app.get("/episode/:id", controller.episode);
}
