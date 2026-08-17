import { buildServer } from "./server.js";
import { env } from "./config/env.js";

async function start() {
  const app = await buildServer();

  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

  console.log(`MediaCore API running on http://localhost:${env.PORT}`);
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
