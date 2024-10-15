import type { NextApiResponse, NextApiRequest } from "next"
import { decodeToken } from "../../lib/tokenUtils"
import { getUser } from "../../lib/userUtils"
import request from "superagent"
import { TableSchema } from "../../components/superInput/types"
import prisma from "../../lib/prisma"
import { SuperFormData } from "../../lib/formEntries"
import { json } from "stream/consumers"

interface Entry {
	content: string
	fieldId: number
	entryId?: number
	snapshotId: string
	required: boolean
}

interface TableData {
	fieldId: number
	entries: Entry[]
	required: boolean
}

export default async function submit(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.headers.authorization?.substring(7)
	if (!token) {
		res.status(400).json({ error: "No token" })
		return
	}
	let id: string
	try {
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
		res.status(401).json({ error: "Invalid token" })
		return
	}

	let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)

	if (snapshot === undefined) {
		res.status(404).json({ error: "Snapshot not found" })
		return
	}

	const { reset } = req.query

	// delete entire snapshot
	if (reset === "true") {
		// delete all entries, as there will be foreign key dependencies
		await prisma.entry.deleteMany({
			where: {
				snapshotId: snapshot.id,
			},
		})
		
		await prisma.snapshot.delete({
			where:{
				id: snapshot.id
			}
		})
		res.json({ success: "true" })
		return
	}

	const request: SuperFormData = req.body
	const normalEntries: Entry[] = []
	let tableEntries: TableData[] = []
	let tableFieldId: number | undefined

	Object.keys(request.entries).forEach((k) => {
		const entry = request.entries[parseInt(k)]
		if (!Array.isArray(entry)) {
			const data = entry as Entry
			normalEntries.push(data)
		} else {
			let tempEntries: Entry[] = []
			if (entry.length > 0) {
				for (let t of entry) {
					tempEntries = []
					let checkRequired: boolean = false
					for (let entry of t.entries) {
						if (entry.required) checkRequired = true
						tempEntries.push({
							...entry,
							content: entry.content!.toString(),
							snapshotId: snapshot!.id,
							required: entry.required,
						})
					}
					tableEntries.push({
						fieldId: parseInt(k),
						entries: tempEntries,
						required: checkRequired,
					})
				}
			} else {
				tableEntries.push({
					fieldId: parseInt(k),
					entries: [],
					required: false,
				})
			}
		}
	})

	// for adding normal entries / updating existing entries
	for (let n of normalEntries) {
		const result = await prisma.entry.updateMany({
			where: { snapshotId: snapshot.id, fieldId: n.fieldId },
			data: {
				content: n.content,
			},
		})

		// finding field that entry belongs to, to update it as completed in fieldGroup

		if (result.count === 0) {
			await prisma.entry.create({
				data: { ...n, snapshotId: snapshot.id },
			})
		}
	}

	// deleting previous table entries
	for (let t of tableEntries) {
		// const tableEntryIds = await prisma.entry.findMany({
		// 	where: {
		// 		snapshotId: snapshot.id,
		// 		fieldId: t.fieldId,
		// 	},
		// 	select: {
		// 		id: true,
		// 	},
		// })
		// if (tableEntryIds) {
		// 	for (let id of tableEntryIds) {
		// 		// deleting all entries under the table subentry
		// 		await prisma.entry.deleteMany({
		// 			where: {
		// 				snapshotId: snapshot.id,
		// 				entryId: id.id,
		// 			},
		// 		})
		// 		// deleting the table subentry
		// 		await prisma.entry.delete({
		// 			where: {
		// 				id: id.id,
		// 			},
		// 		})
		// 	}
		// }

		var entries = await prisma.entry.findMany({
			where: {
				snapshotId: snapshot.id,
				fieldId: t.fieldId,
			},
		})
		if (entries.length > 0) {
			const criteria: any[] = []
			entries.forEach((entry) => {
				criteria.push({
					snapshotId: snapshot!.id,
					id: entry.id,
				})
				criteria.push({
					snapshotId: snapshot!.id,
					entryId: entry.id,
				})
			})
			const { count } = await prisma.entry.deleteMany({
				where: {
					OR: criteria,
				},
			})
		}
	}

	// adding new entries
	for (let t of tableEntries) {
		if (t.entries.length > 0) {
			await prisma.entry.create({
				data: {
					content: "",
					fieldId: t.fieldId,
					snapshotId: snapshot.id,
					entries: {
						createMany: {
							data: t.entries,
						},
					},
					required: t.required,
				},
			})
		}
	}

	res.json({ success: true })
}
