import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import argon2 from "argon2"
import nodemailer from "nodemailer"
import crypto from "crypto"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email } = req.body
	const { reset } = req.query

	if (req.method !== "POST") {
		res.status(404).end()
	}

	try {
		if (reset === "true") {
			const { password, requestId } = req.body
			const request = await prisma.passwordResetRequest.findUnique({
				where: { id: requestId },
				include: {
					user: {
						select: {
							id: true,
							PasswordResetRequest: true,
						},
					},
				},
			})

			if (
				!request ||
				Date.now() - Date.parse(request!.createdAt.toISOString()) >
				1000 * 60 * 60 * 24
			) {
				res.status(404).json({ error: "Request not found" })
				return
			}

			for (const reques of request!.user.PasswordResetRequest) {
				let match = await argon2.verify(
					reques.password,
					password + reques!.salt
				)

				if (match) {
					res.status(400).json({
						error: "Password already used",
					})
					return
				}
			}

			const salt = crypto.randomBytes(16).toString("hex")
			const hash = await argon2.hash(password + salt)

			await prisma.user.update({
				where: { id: request!.user.id },
				data: {
					password: hash,
					salt: salt,
				},
			})

			await prisma.passwordResetRequest.update({
				where: { id: requestId },
				data: { isReset: true },
			})

			res.status(200).json({
				success: true,
			})
			return
		}

		const user = await prisma.user.findFirst({
			where: { email: email },
			include: {
				PasswordResetRequest: true,
			},
		})

		if (user === null) {
			res.status(404).json({
				success: false,
				error: "User not found",
			})
			return
		}

		// for (const request of user.PasswordResetRequest) {
		// 	if (request.isReset === false) {
		// 		res.status(400).json({
		// 			success: false,
		// 			error: "Request already sent",
		// 		})
		// 	}
		// }
		// Uncomment to prevent multiple requests

		const resetReq = await prisma.passwordResetRequest.create({
			data: {
				userId: user!.id,
				password: user!.password,
				salt: user!.salt,
			},
		})

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
		// let info = await transporter.sendMail({
		// 	from: `"IITP Faculty Portal" <noreply-faoff@iitp.ac.in>`, // sender address
		// 	to: email, // list of receivers
		// 	subject: `Your Password Reset Link`, // Subject line
		// 	text: "Please use the link given below to reset your password. It is valid for 1 day", // plain text body
		// 	html: `<p>Please use the link given below to reset your password</p>
		// 			<p>It is valid for <b>one day<b> only</p>
		// 			<p><a href="http://${req.headers.host}/reset-password/${resetReq.id}">Reset Link</a></p>`, // html body
		// })


		// send mail with defined transport object
let info = await transporter.sendMail({
	from: `"IITP Faculty Portal" <noreply-faoff@iitp.ac.in>`, // sender address
	to: email, // list of receivers
	subject: `Password Reset Request - IITP Faculty Portal`, // Subject line
	text: `Dear User,
  
  We received a request to reset the password for your account on the IITP Faculty Portal.
  
  Please click the link below to reset your password. For your security, this link will expire in 24 hours.
  
  Reset your password: http://${req.headers.host}/reset-password/${resetReq.id}
  
  If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.
  
  Best regards,
  IITP Faculty Portal Team`, // plain text body
	html: `<p>Dear User,</p>
		   <p>We received a request to reset the password for your account on the <b>IITP Faculty Portal</b>.</p>
		   <p>Please click the link below to reset your password.</p>
		   <p><a href="http://${req.headers.host}/reset-password/${resetReq.id}">Reset your password</a></p>
		   `, // html body
  })
  

		res.status(200).json({
			success: true,
		})
	} catch (e) {
		console.log(e)
		res.status(500).json({
			success: false,
			error: "Internal Server Error",
		})
	}
}
