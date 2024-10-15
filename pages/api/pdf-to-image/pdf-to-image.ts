// pages/api/pdf-to-image.js
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const pdfResponse = await fetch(url);
    const pdfBuffer = await pdfResponse.arrayBuffer();

    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const page = pdfDoc.getPages()[0];
    const pngImage = await page.render();

    const resizedImage = await sharp(pngImage)
      .resize({ width: 1000 }) // Adjust size as needed
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.send(resizedImage);
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    res.status(500).json({ error: 'Failed to convert PDF to image' });
  }
}
