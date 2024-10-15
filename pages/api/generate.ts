// import type { NextApiRequest, NextApiResponse } from "next"
// import { Stream } from "stream"
// import { generatePdf } from "../../lib/generatePdf"
// import { generatePreview } from "../../lib/generatePreview"
// import prisma from "../../lib/prisma"
// import { decodeToken } from "../../lib/tokenUtils"
// import { Admin } from "@prisma/client"
// import path from "path"

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const token = req.headers.authorization?.substring(7)
// 	const { draft }: { draft: boolean } = req.body
// 	if (!token) {
// 		res.status(400).json({ error: "No token" })
// 		return
// 	}
// 	let id: string
// 	try {
// 		id = decodeToken(token)
// 	} catch (e) {
// 		res.status(401).json({ error: "Invalid token" })
// 		return
// 	}

// 	let admin: Admin | null = null

// 	let user = await prisma.user.findUnique({
// 		where: { id },
// 		include: { snapshot: true },
// 	})

// 	if (!user) {
// 		admin = await prisma.admin.findUnique({
// 			where: { id },
// 		})

// 		if (!admin) {
// 			res.status(401).json({ error: "Invalid token" })
// 			return
// 		}
// 	}

// 	let snapshotId: string

// 	if (admin != null) {
// 		snapshotId = req.body.snapshotId
// 	} else {
// 		let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)

// 		if (snapshot === undefined) {
// 			res.status(404).json({ error: "Snapshot not found" })
// 			return
// 		}
// 		snapshotId = snapshot.id
// 	}

// 	//let userid: string

// 	// admin != null ? (userid = req.body.id) : (userid = user!.id)

// 	const readStrem = new Stream.PassThrough()

// 	// const docx = await generatePreview(userid)
// 	const docx = await generatePreview(snapshotId, draft)

// 	readStrem.end(docx)
// 	res.setHeader(
// 		"Content-disposition",
// 		"attachment; filename=" + "output.docx"
// 	)
// 	res.setHeader(
// 		"Content-Type",
// 		"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
// 	)
// 	readStrem.pipe(res)
// }




import type { NextApiRequest, NextApiResponse } from "next"
import { Stream } from "stream"
import { generatePdf } from "../../lib/generatePdf"
import { generatePreview } from "../../lib/generatePreview"
import prisma from "../../lib/prisma"
import { decodeToken } from "../../lib/tokenUtils"
import { Admin } from "@prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = req.headers.authorization?.substring(7)
	const { draft }: { draft: boolean } = req.body

	if (!token) {
		return res.status(400).json({ error: "No token" })
	}

	let id: string
	try {
		id = decodeToken(token)
	} catch (e) {
		return res.status(401).json({ error: "Invalid token" })
	}

	try {
		let admin: Admin | null = null
		let user = await prisma.user.findUnique({
			where: { id },
			include: { snapshot: true },
		})

		// If user doesn't exist, check if the admin exists
		if (!user) {
			admin = await prisma.admin.findUnique({
				where: { id },
			})

			if (!admin) {
				return res.status(401).json({ error: "Invalid token" })
			}
		}

		// Determine the snapshotId
		let snapshotId: string
		if (admin != null) {
			snapshotId = req.body.snapshotId
		} else {
			let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)
			if (!snapshot) {
				return res.status(404).json({ error: "Snapshot not found" })
			}
			snapshotId = snapshot.id
		}

		// Generate the document (DOCX)
		const docx = await generatePreview(snapshotId, draft)

		// Create a readable stream and pipe the document back to the client
		const readStream = new Stream.PassThrough()
		readStream.end(docx)

		res.setHeader("Content-disposition", "attachment; filename=output.docx")
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		)
		readStream.pipe(res)
	} catch (error) {
		console.error("Error in API:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

