import type { NextApiResponse, NextApiRequest } from "next"
import { decodeToken } from "./tokenUtils"
import prisma from "./prisma"
import { Snapshot, User } from "@prisma/client"

export async function getUser(
	token: string,
	res: NextApiResponse
) {
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
	return user
}
