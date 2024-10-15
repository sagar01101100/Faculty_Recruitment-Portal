// pages/api/snapshotCount.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
 
  const { email } = req.body;


  try {
    console.log(email)
    // Fetch user based on email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Count number of snapshots for this user
    const snapshotCount = await prisma.snapshot.count({
      where: { userId: user.id },
    });

    if (snapshotCount > 10) {
      return res.status(400).json({ error: "Snapshot limit exceeded" });
    }

    // Respond with the count
    return res.status(200).json({ count: snapshotCount });
  } catch (error) {
    console.error("Error counting snapshots:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
