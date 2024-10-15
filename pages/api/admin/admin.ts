import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import crypto from "crypto"
import argon2 from "argon2"
import { createToken, decodeToken } from "../../../lib/tokenUtils"

interface Admin {
	name: string
	email: string
	password: string
}

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

	let adm = await prisma.admin.findUnique({
		where: { id },
	})

	if (!adm) {
		res.status(401).json({ error: "Invalid token" })
		return
	}

	const { del } = req.query
	if (del === "true") {
		await prisma.admin.delete({
			where: { id: req.body.id },
		})
	}

	let admin: Admin = req.body
	const salt = crypto.randomBytes(16).toString("hex")
	const hash = await argon2.hash(admin.password + salt)
	await prisma.admin.create({
		data: {
			name: admin.name,
			email: admin.email,
			password: hash,
			salt: salt,
		},
	})
}
