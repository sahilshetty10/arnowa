import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, id } = req.cookies;
  try {
    const logout = await prisma.sessions.update({
      where: { id: parseInt(id!) },
      data: { logout: new Date() },
    });
  } catch (err) {}
  res.setHeader("Set-Cookie", [
    serialize("token", "", { httpOnly: true, path: "/" }),
    serialize("id", "", { httpOnly: true, path: "/" }),
  ]);
  res.json({message:"logged out. Please sign in again"});
};
