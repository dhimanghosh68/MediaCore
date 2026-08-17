import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }
  });
});
