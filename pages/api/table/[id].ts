import type { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient } from "@prisma/client"
import { decodeToken } from "../../../lib/tokenUtils"
import { getUser } from "../../../lib/userUtils"
import prisma from "../../../lib/prisma"
import { truncateSync } from "fs"

export default async function table(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	let userId: string
	try {
		const token = req.headers.authorization!.substring(7)
		userId = decodeToken(token)
	} catch (e) {
		res.status(401).json({ error: "Invalid token" })
		return
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			snapshot: true,
		},
	})

	if (!user) {
		res.status(404).json({ error: "User not found" })
		return
	}

	let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)

	if (snapshot === undefined) {
		res.status(404).json({ error: "Snapshot not found" })
		return
	}


	const table = await prisma.entry.findMany({
		where: {
			fieldId: parseInt(id as string),
			snapshotId: snapshot.id,
		},
		select: {
			fieldId: true,
			entries: {
				select: {
					content: true,
					fieldId: true,
					required: true,
				},
			},
		},
	})
	res.json(table)
}
