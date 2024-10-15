import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query
  const filePath = path.join(process.cwd(), '.uploads', filename as string)

  try {
    const pdfBuffer = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'application/pdf')
    res.send(pdfBuffer)
  } catch (error) {
    res.status(404).json({ error: 'PDF not found' })
  }
}