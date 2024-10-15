


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
	from: `"IITP Faculty Recruitment Portal" <noreply-faoff@iitp.ac.in>`, // sender address
	to: user.email, // list of receivers
	subject: "Application Submission Confirmation - IITP Faculty Recruitment", // Subject line
	text: `Dear Applicant,
  
  Thank you for your interest in joining the IITP faculty team. We have successfully received your application. Your application will be reviewed by our selection committee, and we will notify you of the next steps in the process. If you have any questions or need further assistance, please do not hesitate to contact us at recruitment@iitp.ac.in.
  
  Best regards,
  IITP Faculty Recruitment Team,
  Indian Institute of Technology Patna.`, // plain text body
	html: `<p>Dear Applicant,</p>
		   <p>Thank you for your interest in joining the <b>IITP faculty team</b>. We have successfully received your application.<br/>
		   Your application will be reviewed by our selection committee, and we will notify you of the next steps in the process.<br/>
		   If you have any questions or need further assistance, please do not hesitate to contact us at <a href="mailto:recruitment@iitp.ac.in">recruitment@iitp.ac.in</a>.</p>
		   <p>Best regards,<br/>
		   IITP Faculty Recruitment Team,<br/>
		   Indian Institute of Technology Patna.</p>`, // html body
  })
  

	const token = createToken(user2.id)
	res.json({
		token: token,
	})
}

