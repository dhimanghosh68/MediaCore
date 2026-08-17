import { FastifyRequest } from "fastify";
import { searchService } from "../services/search.service.js";

export async function search(request: FastifyRequest) {
  const query = request.query as {
    q?: string;
    page?: string;
    limit?: string;
  };

  return searchService.search(
    query.q ?? "",
    Number(query.page ?? 1),
    Number(query.limit ?? 20),
  );
}
