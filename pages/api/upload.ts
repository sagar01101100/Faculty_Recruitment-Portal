import { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import { decodeToken, verifyToken } from "../../lib/tokenUtils"
import fs from "fs"
import prisma from "../../lib/prisma"

export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "DELETE") {
		if (
			!req.headers.authorization ||
			!verifyToken(req.headers.authorization.substring(7))
		) {
			res.status(400).json({ error: "Invalid token" })
			return
		}

		const userId = decodeToken(req.headers.authorization.substring(7))

		let user = await prisma.user.findUnique({
			where: { id: userId },
			include: { snapshot: true },
		})

		if (!user) {
			res.status(403).json({
				success: false,
				error: "User not found",
			})
			return
		}

		let snapshot = user!.snapshot.find(
			(s) => s.id === req.headers.snapshotid
		)

		if (snapshot === undefined) {
			res.status(404).json({ error: "Snapshot not found" })
			return
		}

		const { count } = await prisma.entry.deleteMany({
			where: {
				snapshotId: snapshot.id,
				content: req.query.file as string,
			},
		})
		try {
			fs.unlinkSync("./.uploads/" + req.query.file)
			res.json({ success: true })
			return 
			}
			catch(e){
					console.error(e)
					res.status(404).json({error:"File Not Found"})
			}

		
		return
	}

	if (req.method !== "POST") {
		res.status(404).end()
		return
	} else if (
		!req.headers["content-type"] ||
		req.headers["content-type"].indexOf("multipart/form-data") !== 0
	) {
		res.status(400).json({ error: "Must be a multipart/form-data request" })
		return
	} else if (
		!req.headers.authorization ||
		!verifyToken(req.headers.authorization.substring(7))
	) {
		res.status(400).json({ error: "Invalid token" })
		return
	}

	const form = formidable({
		multiples: true,
		uploadDir: "./.uploads/",
		keepExtensions: true,
	})

	let r: formidable.Files | undefined = undefined
	form.parse(req, async (err, fields, files) => {
		if (!err) {
			if (Array.isArray(files.file)) {
				res.status(500).json({
					error: "unexpected error",
				})
				return
			}
			const file = files.file
			
			if(file === undefined) {
				res.json({})
			}
            
			res.json({
				fileName: file.originalFilename,
				filePath: file.newFilename,
			})
			return
		} else {
			res.status(500).json({ error: err })
			return
		}
	})
}
