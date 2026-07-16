import { buildServer } from "./server";

async function start() {
    const app = await buildServer();

    await app.listen({
        port: 4000,
        host: "0.0.0.0",
    });

    console.log("API running on http://localhost:4000");
}

start();