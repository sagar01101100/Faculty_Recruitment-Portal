import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken, verifyToken } from "../../lib/tokenUtils";
import prisma from "../../lib/prisma";
import path from "path";
import puppeteer from "puppeteer";
import fs from "fs"
import PDFMerger from "pdf-merger-js";

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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
			include: {
				snapshot: {
					include: {
						department: true,
						position: true
					}
				}
			},
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

		const merger = new PDFMerger()

		try {

			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();

			// Construct the URL and file path
			const url = `http://${req.headers.host}/${snapshot.id}/preview`;
			const pdfDir = path.join("/home/iitp/faculty_dashboard/iitp-automation", '.pdfs', snapshot.id);

			// Ensure the directory exists
			fs.mkdirSync(pdfDir, { recursive: true });

			const pdfPath = path.join(pdfDir, 'snapshot.pdf');

			// Navigate to the URL
			await page.goto(url, { waitUntil: 'networkidle2' });

			await page.evaluate((token: string) => {
				localStorage.setItem("auth-token", token)
			}, req.headers["authorization"]?.substring(7)!)
			// Navigate to the URL
			await page.goto(url, { waitUntil: 'networkidle2' });

			// Print the webpage as a PDF
			await page.pdf({ path: pdfPath, format: 'A4' });
			console.log(`PDF saved at ${pdfPath}`);
			merger.add(pdfPath)
			await browser.close();
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				success: false,
				error: error
			})
		}

		const files = await prisma.field.findMany({
			where: {
				allowFile: true,
			}, select: {
				title: true,
				Entry: {
					where: {
						snapshotId: snapshot.id,
						isFile: true
					},
					select: {
						content: true,
					}
				}
			}
		})

		const notExistList = []

		for (let file of files) {
			if (file.Entry.length > 0) {
				let filePath = path.join("/home/iitp/faculty_dashboard/iitp-automation", '.uploads', file.Entry[0].content)
				if (fs.existsSync(filePath) && filePath.includes(".pdf")) {
					await merger.add(filePath)
				} else {
					notExistList.push(file.Entry[0].content)
				}
			}
		}

		const folderPath = path.join("/home/iitp/faculty_dashboard/iitp-automation", "submissions", snapshot.department.name, snapshot.position.name)

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true })
		}

		await merger.save(path.join(folderPath, `${user.name}-${snapshot.id}.pdf`))

		const pdfBuffer = fs.readFileSync(path.join(folderPath, `${user.name}-${snapshot.id}.pdf`))

		return res.send(pdfBuffer)
	}
}