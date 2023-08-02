import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(404).end();

  const prisma = new PrismaClient();

  const id = parseInt(req.query.id);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return res.status(404).end();

  return res.status(200).send(user);
}
