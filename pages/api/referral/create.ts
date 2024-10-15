import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
import prisma from "../../../lib/prisma"
import { decodeToken } from "../../../lib/tokenUtils"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).end()
		return
	}
	// try {
	const { email, address }: { email: string; address: string } = req.body

	const userId = decodeToken(req.headers.authorization!.substring(7))
	const user = await prisma.user.findUnique({
		where: { id: userId },
	})

	// Creating a new referral in database
	const referral = await prisma.referral.create({
		data: {
			userId: userId,
			email: email,
			address: address,
		},
	})

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount()

	// create reusable transporter object using the default SMTP transport
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
		from: `"${user?.name}" <noreply-faoff@iitp.ac.in>`, // sender address
		to: email, // list of receivers
		subject: `Please submit your referral for ${
			user?.name ?? "the applicant"
		}`, // Subject line
		text: `\n\nPlease use the below link to submit your referral \n\n ${req.headers.host}/referral/${referral.id}`, // plain text body
		html: `<p>Please use the below link to submit your referral</p>
				<p><a href="http://${req.headers.host}/referral/${referral.id}">Referral Link</a></p>`, // html body
	})
	res.json({ success: true })
	// } catch (e) {

	// 	res.json({ sucess: false, e })
	// }
}
