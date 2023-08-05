// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendMessage } from "../../../utils/sendSms";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404);

  const prisma = new PrismaClient();

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      guardianName,
      guardianContact,
      gender,
      disease,
      doctorName,
      doctorContact,
      firstAid,
      address,
    } = req.body;

    const hashedPw = crypto.createHash("sha256").update(password).digest("hex");

    const getUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (getUser) {
      return res.status(400).end();
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPw,
        phoneNumber,
        gender,
        guardianName,
        guardianContact,
        disease,
        doctorName,
        doctorContact,
        firstAid,
        address,
      },
    });

    await sendMessage(
      [phoneNumber],
      "ELC에 오신걸 환영합니다. http://elc.lol 에서 로그인후 QR코드를 다운받아 배경화면으로 설정해보세요!"
    );

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).end();
  }
}
