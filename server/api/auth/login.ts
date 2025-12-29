import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "~/utils/auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found" };
  if (!user.password) return { error: "User has no password set" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: "Invalid password" };

  const token = generateToken(user.id);
  return { token, user: { id: user.id,name:user.name, email: user.email } };
});
