import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
import prisma from "../../../lib/prisma"
import { decodeToken, verifyToken } from "../../../lib/tokenUtils"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		res.status(404).end()
		return
	} else if (
		!req.headers.authorization ||
		!verifyToken(req.headers.authorization?.substring(7))
	) {
		res.status(400).json({
			error: "Invalid token",
		})
		return
	}
	try {
		const referrals = await prisma.referral.findMany({
			where: {
				userId: decodeToken(req.headers.authorization?.substring(7)),
			},
			select: {
				email: true,
				submitted: true,
			},
		})
		res.json(referrals)
		return
	} catch (e) {
		console
		res.json({ sucess: false, e })
	}
}
