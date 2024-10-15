import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { decodeToken, verifyToken } from "../../lib/tokenUtils"

export default async function handler(

	req: NextApiRequest,
	res: NextApiResponse
	) {
	console.log(" Submit API is called....");
	if (req.method === "POST") {
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

		const id = decodeToken(req.headers["authorization"]?.substring(7))

		let user = await prisma.user.findUnique({
			where: { id },
			include: { snapshot: true },
		})

		if (!user) {
			res.status(403).json({
				success: false,
				error: "User not found",
			})
			return
		}

		let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)

		if (snapshot === undefined) {
			res.status(404).json({ error: "Snapshot not found" })
			return
		}

		const progress = await prisma.fieldGroup.findMany({
			select: {
				id: true,
				fields: {
					where: {
						Entry: {
							some: {
								snapshotId: snapshot.id,
							},
						},
					},
					select: {
						id: true,
						Entry: true,
						type: true,
						isRequired: true,
					},
				},
			},
		})

		if (progress.length <= 0) {
			res.status(400).json({
				success: false,
				error: "Form is empty",
			})
			return
		}

		let finalProgress: {
			fieldGroupId: number
			progress: number
		}[] = []

		for (let fg of progress) {
			let currentFGProgress: number = 0

			for (let field of fg.fields) {
				if (
					(field.Entry.length > 0 || field.type === "referral") &&
					field.isRequired
				) {
					currentFGProgress++
				}
			}

			finalProgress.push({
				fieldGroupId: fg.id,
				progress: currentFGProgress,
			})
		}

		const fullFieldGroups = await prisma.fieldGroup.findMany({
			select: {
				id: true,
				fields: {
					select: {
						id: true,
						Entry: true,
						type: true,
						isRequired: true
					},
				},
			},
		})

		for (let p of finalProgress) {
			// const totalFields = progress.find((fg) => fg.id === p.fieldGroupId)!
			// 	.fields.length
			const totalFields = fullFieldGroups.find(
				(fg) => fg.id === p.fieldGroupId
			)!.fields.filter((field) => field.isRequired).length

			if (
				totalFields >
				(finalProgress.find((fp) => fp.fieldGroupId === p.fieldGroupId)
					?.progress ?? 0)
			) {
				console.log(finalProgress, totalFields)
				res.status(400).json({
					success: false,
					error: "Progress is incomplete",
					fieldGroupId: p.fieldGroupId,
				})
				return
			}
		}
		// const referrals = await prisma.referral.count({
		// 	where: {
		// 		userId: snapshot.userId
		// 	}
		// })

		// if (referrals < 3) {
		// 	res.status(400).json({
		// 		success: false,
		// 		error: "Please submit atleast 3 referrals to continue",
		// 	})
		// 	return
		// }

		await prisma.snapshot.update({
			where: { id: snapshot.id },
			data: {
				isComplete: true,
			},
		})

		res.json({
			success: true,
		})
		return
	}
}
