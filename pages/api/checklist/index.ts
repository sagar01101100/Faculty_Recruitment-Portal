import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { decodeToken, verifyToken } from "../../../lib/tokenUtils"

interface CheckListResponse {
	id: number
	checked: boolean
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (
		!req.headers.authorization ||
		!verifyToken(req.headers.authorization?.substring(7))
	) {
		res.status(400).json({
			error: "Invalid token",
		})
		return
	}
	const userId = decodeToken(req.headers.authorization?.substring(7))
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			snapshot: true,
		}
	})

	if (user === null) {
		res.status(404).json({
			error: "User not found",
		})
		return
	}

	let snapshot = user!.snapshot.find((s) => s.id === req.body.snapshotId)

	if (snapshot === undefined) {
		res.status(404).json({ error: "Snapshot not found" })
		return
	}

	if (req.body.funcType === "get") {
		try {
			var checkFields = await prisma.field.findMany({
				where: {
					type: "checklist",
				},
				select: {
					title: true,
					id: true,
				},
				orderBy: {
					id: "asc",
				},
			})
			var checkedFields = await prisma.entry.findMany({
				where:{
					snapshotId: snapshot.id,
					field: {
						type: "checklist",
					}
				},
				select: {                                      
					id: true,
					field: {
						select: {
							id: true,
							title: true,
						}
					}
				}
			})
			res.json({checkFields, checkedFields})
			return
		} catch (e) {
			res.status(500).json({ error: e })
			return
		}
	} else if (req.body.funcType === "modify") {
		try {
			const response: CheckListResponse[] = req.body.newCheckList
			const checkedFields = response.filter((field) => field.checked)
			const uncheckedFields = response
				.filter((field) => !field.checked)
				.map((field) => field.id)
			await prisma.$transaction([
				prisma.entry.createMany({
					data: checkedFields.map((field) => {
						return {
							content: field.checked + "",
							snapshotId: snapshot!.id,
							fieldId: field.id,
						}
					}),
				}),
				prisma.entry.deleteMany({
					where: {
						snapshotId: snapshot!.id,
						fieldId: {
							in: uncheckedFields,
						},
					},
				}),
			])
			res.json({
				success: true,
			})
		} catch (e) {
			res.status(500).json({ error: e })
			return
		}
	}
}
