// src/pages/api/examples.ts
import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET!);
      console.log("user is verified");
    } catch {
      console.log("could not verify user");
    }
  } else {
    console.log("user is not verified");
  }
  res.status(200).json({ message: "ok" });
};

export default examples;
