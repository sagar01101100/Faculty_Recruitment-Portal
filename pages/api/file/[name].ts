import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { verifyToken, decodeToken } from "../../../lib/tokenUtils"
import fs from "fs"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		if (
			!req.headers["authorization"] ||
			!verifyToken(req.headers["authorization"]?.substring(7))
		) {
			res.status(401).json({
				success: false,
				error: "Unauthorized",
			})
			return
		}

		const userId = decodeToken(req.headers["authorization"]?.substring(7))
		const { name } = req.query

		let fileEntry = await prisma.entry.findFirst({
			where: {
				snapshot: {
					userId,
				},
				content: name as string,
			},
		})

		if (fileEntry === null) {
			res.status(404).end()
			return
		}

		var stat = fs.statSync("./.uploads/" + fileEntry.content)

		res.writeHead(200, {
			"Content-Type": (name as string).endsWith("png") ? "application/png" : "application/pdf",
			"Content-Length": stat.size,
		})

		const file = fs.createReadStream("./.uploads/" + fileEntry.content)
		file.pipe(res)
	} else {
		res.status(404).end()
	}
}
