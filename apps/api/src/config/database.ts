import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env.js";

console.log("DATABASE_URL =", env.DATABASE_URL);

const adapter = new PrismaPg(env.DATABASE_URL);

export const prisma = new PrismaClient({
  adapter,
});