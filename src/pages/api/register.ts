import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone } = req.body;
  const user = await prisma.users.create({
    data: { name: name, email: email, phone: parseInt(phone) },
  });
  if (user) {
    res.json({ message: "user created" });
  } else {
    res.json({ message: "user not created" });
  }
};
