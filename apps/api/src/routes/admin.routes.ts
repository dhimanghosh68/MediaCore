import { FastifyInstance } from "fastify";
import * as controller from "../controllers/admin.controller.js";

async function requireAdmin(request: any, reply: any) {
  const user = request.user as { role?: string };

  if (user.role !== "ADMIN") {
    return reply.code(403).send({
      message: "Admin access required",
    });
  }
}

export default async function adminRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get("/dashboard", controller.dashboard);

  app.patch("/users/:id/role", controller.setUserRole);
}
