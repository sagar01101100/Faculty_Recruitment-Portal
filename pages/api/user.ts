import type { NextApiResponse, NextApiRequest } from "next"
import { PrismaClient } from "@prisma/client"
import { decodeToken } from "../../lib/tokenUtils"
import { getUser } from "../../lib/userUtils"
import prisma from "../../lib/prisma"
import { MapType } from "../../lib/formEntries"

export default async function user(req: NextApiRequest, res: NextApiResponse) {
	const { status } = req.query
	let id: string
	try {
		const token = req.headers.authorization!.substring(7)
		id = decodeToken(token)
	} catch (e) {
		res.status(401).json({ error: "Invalid token" })
		return
	}
	let user = await prisma.user.findUnique({
		where: { id },
		include: { snapshot: true },
	})
	
	if (!user) {
		res.status(404).json({ error: "User not found" })
		return
	}

	if (status === "true") {
		if (!user.verified) {
			res.status(403).json({ error: "User not verified" })
			return
		}
		let snapshots = await prisma.snapshot.findMany({
			where: { userId: user.id },
			select: {
				id: true,
				isComplete: true,
				department: true,
				position: true,
			},
		})
		res.json({ snapshots })
		return
	}

	let snapshot = await prisma.snapshot.findUnique({
		where: { id: req.body.snapshotId },
		include: {
			entries: {
				include: {
					field: true,
					Entry: true,
				},
			},
		},
	})

	if (snapshot?.userId !== id) {
		res.status(404).json({ error: "Snapshot not found." })
		return
	}

	const entries: { [key: number]: MapType } = {}

	for (let entry of snapshot!.entries) {
		if (entry.entryId === null) {
			if (
				entries[entry.fieldId!] === undefined &&
				entry.field?.type !== "table"
			)
				entries[entry!.fieldId!] = {
					content: entry.content,
					required: entry.required,
				}
		}
	}

	const progress = await prisma.fieldGroup.findMany({
		select: {
			id: true,
			fields: {
				where: {
					Entry: {
						some: {
							snapshotId: snapshot!.id,
						},
					},
				},
				select: {
					id: true,
					Entry: true,
					type: true,
					isRequired: true,
				},
			},
		},
	})

	let finalProgress: {
		fieldGroupId: number
		progress: number
	}[] = []

	for (let fg of progress) {
		let currentFGProgress: number = 0

		for (let field of fg.fields) {
			if (
				(field.Entry.length > 0 || field.type === "referral") &&
				field.isRequired
			) {
				// if (field.id === 1) {
				// 	console.log(field.Entry)
				// }
				currentFGProgress++
			}
		}

		finalProgress.push({
			fieldGroupId: fg.id,
			progress: currentFGProgress,
		})
	}

	res.json({ entries, finalProgress })
}
