import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, id } = req.cookies;
  try {
    verify(token!, process.env.JWT_SECRET!);
    await prisma.messages.create({
      data: { message: req.body.msg, sessionsId: parseInt(id!) },
    });
    res.json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.json({ message: "failed" });
  }
};
