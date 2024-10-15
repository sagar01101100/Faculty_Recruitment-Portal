

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Trying to fetch email..................");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { snapshotId } = req.body;

  try {
    // Fetch user's email based on snapshotId
    const snapshot = await prisma.snapshot.findUnique({
      where: { id: snapshotId },
      include: { user: { select: { email: true } } },
    });

    if (!snapshot) {
      return res.status(404).json({ error: "Snapshot not found" });
    }

    if (!snapshot.user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user's email
    return res.status(200).json({ email: snapshot.user.email });
  } catch (error) {
    console.error("Error fetching user email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}