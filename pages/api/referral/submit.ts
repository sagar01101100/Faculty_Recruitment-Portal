import { Entry } from "@prisma/client"
import { SuperFormData } from "../../../lib/formEntries"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).end()
		return
	}

	try {
		// const entries: Entry[] = req.body.entries
		const request: SuperFormData = req.body
		const referralId = req.body.referralId
		const referralEntries: Entry[] = []

		console.log(request.entries)

		Object.keys(request.entries).forEach((k) => {
			const entry = request.entries[parseInt(k)]
			if (!Array.isArray(entry)) {
				const data = entry as Entry
				referralEntries.push(data)
			}
		})

		await prisma.referralEntry.createMany({
			data: referralEntries.map((entry) => {
				return {
					content: entry.content,
					entryId: entry.entryId,
					fieldId: entry.fieldId!,
					referralId: referralId,
					isFile: entry.isFile,
				}
			})
		})

		// await prisma.referralEntry.createMany({
		// 	data: entries.map((entry) => {
		// 		return {
		// 			content: entry.content,
		// 			entryId: entry.entryId,
		// 			fieldId: entry.fieldId!,
		// 			referralId: referralId,
		// 			isFile: entry.isFile,
		// 		}
		// 	}),
		// })

		await prisma.referral.update({
			data: {
				submitted: true,
			},
			where: {
				id: referralId,
			},
		})
		res.json({
			success: true,
		})
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Internal server error" })
	}
}
