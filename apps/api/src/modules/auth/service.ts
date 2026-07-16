import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { registerSchema } from "./schema.js";

import { loginSchema } from "./schema.js";


export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = registerSchema.parse(request.body);

  const existingUser = await request.server.prisma.user.findFirst({
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

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await request.server.prisma.user.create({
    data: {
      email: body.email,
      username: body.username,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
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

  const user = await request.server.prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return reply.status(401).send({
      message: "Invalid credentials",
    });
  }

  const valid = await bcrypt.compare(body.password, user.password);

  if (!valid) {
    return reply.status(401).send({
      message: "Invalid credentials",
    });
  }

  const token = await reply.jwtSign({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
}