import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { registerSchema, loginSchema } from "./schema.js";
import { prisma } from "../../config/database.js";

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = registerSchema.parse(request.body);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: body.email },
        { username: body.username },
      ],
    },
  });

  if (existingUser) {
    return reply.code(409).send({
      message: "Email or username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      username: body.username,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });

  return reply.code(201).send(user);
}

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = loginSchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return reply.code(401).send({
      message: "Invalid credentials",
    });
  }

  const valid = await bcrypt.compare(
    body.password,
    user.password,
  );

  if (!valid) {
    return reply.code(401).send({
      message: "Invalid credentials",
    });
  }

  const token = await reply.jwtSign({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
}
