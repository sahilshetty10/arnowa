import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone } = req.body;
  const user = await prisma.users.findFirst({
    where: { name: name, email: email, phone: parseInt(phone) },
    include: { sessions: { include: { messages: true } } },
  });
  if (user) {
    const { id } = await prisma.sessions.create({
      data: { usersEmail: user.email },
    });
    const token = sign(user, process.env.JWT_SECRET!, { expiresIn: 300 });
    res.setHeader("Set-Cookie", [
      serialize("token", token, {
        maxAge: 300,
        httpOnly: true,
        path: "/",
      }),
      serialize("id", JSON.stringify(id), {
        maxAge: 300,
        httpOnly: true,
        path: "/",
      }),
    ]);
    res.status(200).json({ message: "logged in" });
  } else {
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        path: "/",
      })
    ),
      res.json({ message: "login failed" });
  }
};
