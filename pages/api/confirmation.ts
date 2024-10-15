import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { decodeToken } from "../../lib/tokenUtils"

export default async function handler(
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
	try {
		const fields = await prisma.field.findMany({
			where: {
				fieldGroupId: {
					not: null,
				},
			},
			include: {
				fields: {
					orderBy: {
						id: "asc",
					},
				},
			},
		})
		res.json({
			fields,
		})
	} catch (e) {
		console.log(e)
		res.status(500).end()
	}
}
