import handlebars from "handlebars"
import prisma from "./prisma"
import fs from "fs"
import createReport, { getMetadata } from "docx-templates"
import dayjs from "dayjs"

export async function generatePreview(snapshotId: string, draft: boolean) {
	handlebars.registerHelper("inc", function (value, options) {
		return parseInt(value) + 1
	})

	var snapshot = await prisma.snapshot.findFirst({
		where: {
			id: snapshotId,
		},
		include: {
			user: {
				include: {
					Referral: {
						include: {
							entries: {
								include: {
									field: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (snapshot == null) {
		throw new Error("No snapshot found")
	}

	var entries = await prisma.entry.findMany({
		where: {
			snapshotId: snapshot.id,
		},
		include: {
			field: true,
			entries: {
				include: {
					field: true,
				},
			},
			Entry: {
				include: {
					field: true,
				},
			},
		},
	})

	var values: { [key: string]: string | Array<{ [key: string]: string }> } =
		{}

	for (let entry of entries) {
		if (entry.field?.templateFieldName) {
			if (entry.entryId != null) {
				continue
			}
			if (entry.entries?.length > 0) {
				var temp: { [key: string]: string } = {}
				for (const childEntries of entry.entries) {
					if (childEntries.field!.templateFieldName != null) {
						temp[childEntries.field!.templateFieldName] =
							childEntries.isFile
								? "Sheet Attached"
								: childEntries.content
					}
				}
				if (values[entry.field!.templateFieldName] == null) {
					values[entry.field!.templateFieldName] = [temp]
				} else {
					if (values[entry.field!.templateFieldName])
						(values[entry.field!.templateFieldName] as any).push(
							temp
						)
				}
			} else {
				if (entry.isFile) {
					values[entry.field?.templateFieldName] = entry.content
				} else {
					if (entry.field.type === "date") {
						values[entry.field?.templateFieldName] = dayjs(
							entry.content
						).format("DD-MM-YYYY")
					} else {
						values[entry.field?.templateFieldName] = entry.content
					}
				}
			}
		}
	}

	values["referrals"] = []
	for (const referral of snapshot.user.Referral) {
		values["referrals"].push({
			email: referral.email ?? "",
			address: referral.address ?? "",
			name:
				referral.entries.find((entry) => entry.field.title === "Name")
					?.content ?? "",
			phone:
				referral.entries.find(
					(entry) => entry.field.title === "Phone Number"
				)?.content ?? "",
		})
	}

	const source = draft ? fs.readFileSync("./templates/template_draft.docx") : fs.readFileSync("./templates/template.docx")
	const buffer = await createReport({
		template: source,
		data: {
			values,
		},
		cmdDelimiter: ["{", "}"],
		failFast: true,
		processLineBreaks: false,
		additionalJsContext: {
			image: (name: string) => {
				return {
					width: 3,
					height: 4,
					data: fs.readFileSync(
						`/home/iitp/faculty_dashboard/iitp-automation/.uploads/${name}`
					),
					extension: ".png",
				}
			},
		},
	})

	return buffer
}
