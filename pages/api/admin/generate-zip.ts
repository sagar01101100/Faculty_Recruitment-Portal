import type { NextApiRequest, NextApiResponse } from "next"
import { generatePreview } from "../../../lib/generatePreview"
import prisma from "../../../lib/prisma"
import { decodeToken } from "../../../lib/tokenUtils"
import fs from "fs"
import { zip } from "zip-a-folder"
import { ColorModeScript } from "@chakra-ui/react"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).end()
		return
	}
	var id: string
	try {
		const token = req.headers.authorization!.substring(7)
		id = decodeToken(token)
	} catch (e) {
		res.status(401).json({ error: "Invalid token" })
		return
	}

	var admin = await prisma.admin.findUnique({
		where: { id },
	})
	if (admin === null) {
		res.status(401).json({ error: "Invalid token" })
		return
	}
	try {
		const userId = req.body.id
		const snapshotId = req.body.snapshotId
		const doc = await generatePreview(snapshotId, false)

		fs.mkdirSync(`./.temp/previews/${userId}`, { recursive: true })
		fs.writeFileSync(`./.temp/previews/${userId}/report.docx`, doc)

		const files = await prisma.entry.findMany({
			where: {
				isFile: true,
				snapshotId: snapshotId,
			},
			select: {
				content: true,
			},
		})
		for (const file of files) {
			fs.copyFileSync(
				"./.uploads/" + file.content,
				`./.temp/previews/${userId}/${file.content}`
			)
		}

		await zip(
			`./.temp/previews/${userId}`,
			`./.temp/previews/${userId}.zip`
		)
		const zipbuffer = fs.readFileSync(`./.temp/previews/${userId}.zip`)
		res.setHeader("Content-Type", "application/zip")
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${userId}.zip`
		)
		res.send(zipbuffer)

		fs.unlinkSync(`./.temp/previews/${userId}.zip`)
		fs.rmdirSync(`./.temp/previews/${userId}`, { recursive: true })
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Error generating preview" })
	}
}
