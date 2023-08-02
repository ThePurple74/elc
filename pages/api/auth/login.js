import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();

  const prisma = new PrismaClient();

  const body = JSON.parse(req.body);

  const { username, password } = body;

  const hashedPw = crypto.createHash("sha256").update(password).digest("hex");

  const user = await prisma.user.findUnique({
    where: {
      email_password: {
        email: username,
        password: hashedPw,
      },
    },
  });

  if (!user) {
    return res.status(400).end();
  }

  const jwt = sign({ id: user.id }, process.env.JWT_KEY);

  res.setHeader(
    "Set-Cookie",
    serialize("authorization", jwt, { path: "/", httpOnly: true, secure: true })
  );

  return res.status(200).send(user);
}
