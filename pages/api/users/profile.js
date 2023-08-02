import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method !== "GET" && req.method !== "PUT") {
    return res.status(404).end();
  }

  try {
    const token = req.cookies["authorization"];

    const verifyToken = verify(token, process.env.JWT_KEY);

    const { id } = verifyToken;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).end();

    if (req.method === "GET") {
      return res.status(200).send(user);
    } else if (req.method === "PUT") {
      const {
        firstName,
        lastName,
        email,
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

      const updatedUser = await prisma.user.update({
        data: {
          firstName,
          lastName,
          email,
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
        where: { id },
      });

      return res.status(200).send(updatedUser);
    }
  } catch (err) {
    return res.status(401).end();
  }
}
