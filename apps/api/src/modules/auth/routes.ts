import { FastifyInstance } from "fastify";
import * as controller from "./controller.js";

export default async function authRoutes(app: FastifyInstance) {
  app.get("/", controller.health);

  app.post("/register", controller.register);

  app.post("/login", controller.login);
}