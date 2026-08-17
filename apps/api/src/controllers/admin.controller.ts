import { FastifyRequest } from "fastify";
import { adminService } from "../services/admin.service.js";

export async function dashboard() {
  return adminService.dashboard();
}

export async function setUserRole(request: FastifyRequest) {
  const { id } = request.params as { id: string };
  const { role } = request.body as { role: "USER" | "ADMIN" };

  return adminService.setUserRole(id, role);
}
