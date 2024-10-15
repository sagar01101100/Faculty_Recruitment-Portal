import argon2 from "argon2"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { createToken, verifyToken } from "../../../lib/tokenUtils"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { email, password } = req.body

		const user = await prisma.admin.findUnique({
			where: {
				email: email,
			},
		})

		if (user == null) {
			res.status(401).end()
			return
		}

		const status = await argon2.verify(user.password, password + user.salt)
		if (status === false) {
			res.status(401).end()
			return
		}

		const token = createToken(user.id)
		res.json({ token })
		return
	}
}
