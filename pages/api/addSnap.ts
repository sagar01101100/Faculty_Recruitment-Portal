import type { NextApiResponse, NextApiRequest } from "next"
import { decodeToken } from "../../lib/tokenUtils"
import { getUser } from "../../lib/userUtils"
import prisma from "../../lib/prisma"
import { MapType } from "../../lib/formEntries"


interface Entry {
	content: string
	fieldId: number
	entryId?: number
	snapshotId: string
	required?: boolean
}

export default async function addSnap(
	req: NextApiRequest,
	res: NextApiResponse
) {
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

	const departmentID = req.body.departmentID
	const positionID = req.body.positionID

	const snapshot = await prisma.snapshot.create({
		data: {
			user: { connect: { id: user.id } },
			department: { connect: { id: departmentID } },
			position: { connect: { id: positionID } },
		},
	})

	const templateEntries = await prisma.templateEntries.findMany({})
	let tempEntries: Entry[] = []

	for (let te of templateEntries) {
		tempEntries.push({
			content: te.content,
			snapshotId: snapshot.id,
			fieldId: te.fieldId!,
			required: true,
		})
	}

	for (let te of tempEntries) {
		await prisma.entry.create({
			data: {
				content: "",
				fieldId: 3,
				snapshotId: snapshot.id,
				entries: {
					createMany: {
						data: te,
					},
				},
				required: true,
			},
		})
	}

	res.json({ success: true })
}
