import { PrismaClient } from "@prisma/client";
import { sendMessage } from "../../../../utils/sendSms";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();

  const prisma = new PrismaClient();

  const id = parseInt(req.query.id);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return res.status(400).end();

  const { guardianContact, doctorContact } = user;

  await sendMessage([guardianContact, doctorContact], "Test Notification");

  return res.status(200).end();
}
