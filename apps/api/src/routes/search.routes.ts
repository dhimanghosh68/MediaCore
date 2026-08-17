import { FastifyInstance } from "fastify";
import * as controller from "../controllers/search.controller.js";

export default async function searchRoutes(app: FastifyInstance) {
  app.get("/", controller.search);
}
