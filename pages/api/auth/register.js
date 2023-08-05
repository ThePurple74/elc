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

    const url = `${process.env.BASE_URL}/users/${user.id}`;

    await sendMessage([{ phoneNumber: phoneNumber }], url);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).end();
  }
}
