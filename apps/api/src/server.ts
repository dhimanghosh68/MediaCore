import Fastify from "fastify";

export async function buildServer() {

    const app = Fastify({
        logger: true,
    });

    app.get("/", async () => {

        return {
            name: "MediaCore API",
            version: "1.0.0",
            status: "running"
        };

    });

    return app;
}