import { jsPDF } from "jspdf"
import fs from "fs"

export function generatePdf() {
	const doc = new jsPDF()

	doc.addImage(fs.readFileSync("./static/logo.png"), "PNG", 10, 10, 40, 40)

	doc.setFontSize(11)
	doc.text(
		[
			"INDIAN INSTITUTE OF TECHNOLOGY PATNA",
			"FORM OF APPLICATION FOR FACULTY APPOINTMENT BY SELECTION ",
		],
		130,
		30,
		{
			align: "center",
		}
	)

	doc.rect(60, 50, 70, 25)
	doc.text(
		[
			"To",
			"Faculty Recruitment Cell",
			"Faculty Affairs Office",
			"Indian Institute of Technology Patna",
			"Bihta, Patna - 801 106, Bihar",
		],
		62,
		55
	)

	doc.save("./static/out.pdf")
}
