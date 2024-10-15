import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import crypto from "crypto"
import argon2 from "argon2"
import { createToken } from "../../lib/tokenUtils"
import nodemailer from "nodemailer"

interface User {
	name: string
	email: string
	password: string
}

interface Entry {
	content: string
	fieldId: number
	entryId?: number
	snapshotId: string
	required?: boolean
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let user: User = req.body
	const salt = crypto.randomBytes(16).toString("hex")
	const hash = await argon2.hash(user.password + salt)

	var userPrev = await prisma.user.findUnique({
		where: {
			email: user.email,
		}
	})

	if (userPrev) {
		res.status(400).json({ error: "Email already exists" })
		return
	}

	var createdUser = await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			password: hash,
			salt: salt,
		},
	})

	var verifyReq = await prisma.verificationRequest.create({
		data: {
			userId: createdUser.id,
		},
	})

	let user2 = await prisma.user.findUnique({
		where: { email: user.email },
		include: { snapshot: true },
	})

	if (!user2) {
		res.status(401).json({ error: "Error occurred." })
		return
	}

	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST!,
		port: parseInt(process.env.SMTP_PORT!),
		secure: false,
		connectionTimeout: 10000,
		auth: {
			user: process.env.SMTP_USER, // generated ethereal user
			pass: process.env.SMTP_PASSWORD, // generated ethereal password
		},
	})

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"IITP Faculty Portal" <noreply-faoff@iitp.ac.in>`, // sender address
		to: user.email, // list of receivers
		subject: `Your Account Verification Link"
	}`, // Subject line
		text: "Please use the link given below to verify your account. It is valid for 1 day", // plain text body
		html: `<p>Please use the link given below to verify your account</p>
				<p>It is valid for <b>one day<b> only</p>
				<p><a href="http://${req.headers.host}/home/${verifyReq.id}">Verification Link</a></p>`, // html body
	})

	const token = createToken(user2.id)
	res.json({
		token: token,
	})
}
