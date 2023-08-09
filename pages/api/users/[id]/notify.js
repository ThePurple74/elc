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

  await sendMessage([guardianContact, doctorContact], "귀하의 환자/자녀가 현재 응급상태 입니다 - ELC");

  return res.status(200).end();
}
