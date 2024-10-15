import type { NextApiRequest, NextApiResponse } from "next"
import { Parser } from "json2csv"
import prisma from "../../../lib/prisma"
import { decodeToken } from "../../../lib/tokenUtils"
import fs from "fs"
import { generateApplicationId } from "../../applicants-details/ApplicationId"

function getEducationKey(degree, field) {
	return `${field} (${degree})`.toLowerCase();
  }
                                                             
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).end()
		return
	}
	var id: string
	try {
		const token = req.headers.authorization!.substring(7)
		id = decodeToken(token)
	} catch (e) {
		res.status(401).json({ error: "Invalid token" })
		return
	}

	var admin = await prisma.admin.findUnique({
		where: { id },
	})
	if (admin === null) {
		res.status(401).json({ error: "Invalid token" })
		return
	}
	const ids: string[] = req.body.ids

	try {
		const snapshots = await prisma.snapshot.findMany({
			where: {
				id: {
					in: ids,
				},
			},
			select: {
				id: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				entries: {
					select: {
						content: true,
						field: {
							select: {
								title: true,
								type: true,
								fieldId: true,
							},
						},
						entryId: true,
						entries: {
							select: {
								id: true,
								content: true,
								field: {
									select: {
										title: true,
										type: true,
										fieldId: true,
									},
								},
							},
						},
					},
				},
				department: {
					select: {
						name: true,
					},
				},
				position: {
					select: {
						name: true,
					},
				},
			},
		})

		var data = []
		for (const snapshot of snapshots) {
			var temp: { [key: string]: string } = {
				// name: snapshot.user.name,

				"application ID": generateApplicationId(
					snapshot.department,
					snapshot.position,
					snapshot.entries.find(e => e.field?.title?.toLowerCase() === `Date of Birth (Please upload true copy of certificate at "Additional Info" section of this form)`.toLowerCase())?.content
				  ),


				department: snapshot.department.name,
				"full name": snapshot.user.name,
				position: snapshot.position.name,
			}

				// Process Employment table
				let employmentCount = 0
				// Process Research Publications table
				let publicationCount = 0
			for (const entry of snapshot!.entries) {
				
				if (entry.entryId === null && entry.field && entry.field!.type !== "table"){
					temp[entry.field!.title!.toLowerCase()] = entry.content

					if (entry.field!.title!.toLowerCase() === "Gender") {
						temp["gender"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Mobile No. (including country code)`.toLocaleLowerCase()) {
						temp["mobile no."] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Do you belong to the PWD category? (Please upload true copy of certificate at "Additional Info" section of this form)`.toLocaleLowerCase()) {
						temp["mobile no."] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Category (Please upload true copy of certificate at "Additional Info" section of this form in case of SC/ST/OBC)`.toLocaleLowerCase()) {
						temp["category"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Do you belong to the PWD category? (Please upload true copy of certificate at "Additional Info" section of this form)`.toLocaleLowerCase()) {
						console.log("PWD category found:", entry.content);
						temp["do you belong to the pwd category?"] = entry.content
					}


					if (entry.field!.title!.toLowerCase() === `Date of Birth (Please upload true copy of certificate at "Additional Info" section of this form)`.toLowerCase()) {
						const fullDate = new Date(entry.content);
						const day = String(fullDate.getDate()).padStart(2, '0');
						const month = String(fullDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
						const year = fullDate.getFullYear();
						temp["date of birth"] = `${day}-${month}-${year}`;
					}

					
					if (entry.field!.title!.toLowerCase() === `Marital Status`.toLocaleLowerCase()) {
						temp["maritial status"] = entry.content
					}


					if (entry.field!.title!.toLowerCase() === `Are you a citizen of India by birth or by domicile?`.toLocaleLowerCase()) {
						temp["Are you a citizen of India by birth or by domicile?"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Age as on closing date of advertisement`.toLocaleLowerCase()) {
						temp["age as on closing Date of advertizement"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `If you are employed, please state your present basic pay and scale of pay`.toLocaleLowerCase()) {
						temp["basic pay and scale"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Father's/Husband's Name`.toLocaleLowerCase()) {
						temp["father's/husbad's name name"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Advt. No.`.toLocaleLowerCase()) {
						temp["advt. No."] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Field of Specialization  `.toLocaleLowerCase()) {
						temp["field of specialization"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `If the appointment is offered, how much time would you need before joining the post?`.toLocaleLowerCase()) {
						temp["time would you need before joining the post?"] = entry.content
					}




					if (entry.field!.title!.toLowerCase() === `No. of PG projects guided`.toLocaleLowerCase()) {
						temp["No of PG Project Giuded"] = entry.content
					}
					if (entry.field!.title!.toLowerCase() === `No. of Ph.D. thesis guided (completed)`.toLocaleLowerCase()) {
						temp["No of PhD thesis gouded(Completed)"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of Ph.D. thesis guided (ongoing)`.toLocaleLowerCase()) {
						temp["No of PhD thesis gouded(Ongoing)"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of Projects involved in (Sponsored)`.toLocaleLowerCase()) {
						temp["No. of Projects involved in (Sponsored) "] = entry.content
					}


					if (entry.field!.title!.toLowerCase() === `No. of Projects involved in (Consultancy)`.toLocaleLowerCase()) {
						temp["No. of Projects involved in (Consultancy)"] = entry.content
					}
					
					if (entry.field!.title!.toLowerCase() === `No. of publications in journals (refereed, national)`.toLocaleLowerCase()) {
						temp["No. of publications in journals (refereed, national)"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of publications in journals (refereed, international)`.toLocaleLowerCase()) {
						temp["No. of publications in journals (refereed, international)"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of publications in conferences (refereed, national)`.toLocaleLowerCase()) {
						temp["No. of publications in conferences (refereed, national)"] = entry.content
					}
					if (entry.field!.title!.toLowerCase() === `No. of publications in conferences (un-refereed, national)`.toLocaleLowerCase()) {
						temp[			"No. of publications in conferences (un-refereed, national)"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of technical reports`.toLocaleLowerCase()) {
						temp["No. of technical reports"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === ` Provide list of books published`.toLocaleLowerCase()) {
						temp["books published"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === ` Provide list of book chapters published`.toLocaleLowerCase()) {
						temp["book chapters"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of patents (mention the status as well)`.toLocaleLowerCase() ){
						temp["no. of patents"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `No. of citations of published papers as on dd/mm/yyyy (based on Google Scholar and Scopus)`.toLocaleLowerCase() ){
						temp["no. of citations of published papers"] = entry.content;
					}




					if (entry.field!.title!.toLowerCase() === `Areas of specialization`.toLocaleLowerCase()) {
						temp["area of specialization"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Title of your Ph. D. Thesis`.toLocaleLowerCase()) {
						temp["title of PhD thesis"] = entry.content
					}
					if (entry.field!.title!.toLowerCase() === `Name of your Ph.D. Supervisor`.toLocaleLowerCase()) {
						temp["PhD supervisor"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Name of your Co-Supervisor`.toLocaleLowerCase()) {
						temp["PhD co-supervisor"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Date of thesis submission`.toLocaleLowerCase()) {
						temp["date of thesis submission"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Date of viva-voce`.toLocaleLowerCase()) {
						temp["date of viva-voce"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Awards and honours (enter comma-separated entries)`.toLocaleLowerCase()) {
						temp["awards and honours"] = entry.content
					}
					if (entry.field!.title!.toLowerCase() === `Editorial board memberships`.toLocaleLowerCase()) {
						temp["editorial board memeberships"] = entry.content
					}
								

					if (entry.field!.title!.toLowerCase() === `Seminars/conferences organized (enter comma-separated entries)`.toLocaleLowerCase()) {
						temp["seminar/conferenced organized"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Did you previously apply for any post in this Institute? If so, enter advertisement number`.toLocaleLowerCase()) {
						temp["did you applied before?"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Additional Remarks:  (Applicants may mention here any special qualifications or experience, e.g. in organisations which have not been included under the heads given above)`.toLocaleLowerCase()) {
						temp["additional remarks"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Name of Referrer 1`.toLocaleLowerCase()) {
						temp["referrer 1"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Designation of Referrer 1`.toLocaleLowerCase()) {
						temp["designation of referrer 1"] = entry.content
					}


					if (entry.field!.title!.toLowerCase() === `Address of Referrer 1 `.toLocaleLowerCase()) {
						temp["address of referrer 1"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Email Address of Referrer 1`.toLocaleLowerCase()) {
						temp["email of referrer 1"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Name of Referrer 2`.toLocaleLowerCase()) {
						temp["referrer 2"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Designation of Referrer 2`.toLocaleLowerCase()) {
						temp["designation of referrer 2"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Address of Referrer 2 `.toLocaleLowerCase()) {
						temp["address of referrer 2"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Email Address of Referrer 2`.toLocaleLowerCase()) {
						temp["email of referrer 2"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Name of Referrer 3`.toLocaleLowerCase()) {
						temp["referrer 3"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Designation of Referrer 3`.toLocaleLowerCase()) {
						temp["designation of referrer 3"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Address of Referrer 3 `.toLocaleLowerCase()) {
						temp["address of referrer 3"] = entry.content
					}
					if (entry.field!.title!.toLowerCase() === `Email Address of Referrer 3`.toLocaleLowerCase()) {
						temp["email of referrer 3"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Do you have any legal proceeding ongoing`.toLocaleLowerCase()) {
						temp["do you have any legal proceeding ongoing"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `Have you at any time been charged acquitted or convicted by a court of law in India or outside India`.toLocaleLowerCase()) {
						temp["been charged acquitted or convicted by a court of law in India or outside India"] = entry.content
					}

					if (entry.field!.title!.toLowerCase() === `I hereby declare that I have carefully read and understood the instructions attached to the advertisement as available on Patna website and that all the entries in this form are true to the best of my knowledge and belief. I also declare that I have not concealed any material information which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact like category or educational qualification etc. made in my application form, I understand that I will be denied any employment in the Institute and if already employed on any of the post in the Institute, my services will be summarily terminated forthwith without notice or compensation.`.toLocaleLowerCase()) {
						temp["declaration"] = entry.content
					}


					if(entry.field!.title === "Awards and honours (enter comma-separated entries)"){
						temp["no. of awards"] = entry.content.split(",").length.toString()
					}
					
				}
				else if (entry.entries.length > 0 && entry.field && entry.field!.title === `Education (Please upload true copy of certificate at "Additional Info" section of this form)`) {
					for (const e of entry.entries) {
					  if (e.field!.title === "Exam/Degree/Diploma passed") {
						const degree = e.content;
						
						for (const eduEntry of entry.entries) {
						  const key = getEducationKey(degree, eduEntry.field!.title);
						  temp[key] = eduEntry.content;
						}
					  }
					}
				  }

					// else if (entry.field && entry.field.title === "Employment") {
					//   employmentCount++
					//   for (const e of entry.entries) {
					// 	temp[`Employment ${employmentCount} - ${e.field!.title}`] = e.content
					//   }
					// } else if (entry.field && entry.field.title === "Your 5 (Five) most important research publications") {
					//   publicationCount++
					//   for (const e of entry.entries) {
					// 	temp[`Research Publication ${publicationCount} - ${e.field!.title}`] = e.content
					//   }
					// }


					  else if (entry.field && entry.field.title === "Employment") {
						employmentCount++
						for (const e of entry.entries) {
						  const fieldTitle = e.field!.title.toUpperCase();
						  if (fieldTitle === "LAST PAY & SCALE OF PAY") {
							temp[`Employment ${employmentCount} - Last Pay & Scale of Pay`] = e.content;
						  } else if (fieldTitle === "POSITION HELD") {
							temp[`Employment ${employmentCount} - Position Held`] = e.content;
						  } else if (fieldTitle === "DATE OF LEAVING") {
							temp[`Employment ${employmentCount} - Date of Leaving`] = e.content;
						  } else if (fieldTitle === "DATE OF JOINING") {
							temp[`Employment ${employmentCount} - Date of Joining`] = e.content;
						  } else if (fieldTitle === "NATURE OF DUTIES/ WORK") {
							temp[`Employment ${employmentCount} - Nature of Duties/Work`] = e.content;
						  } else if (fieldTitle === "ORGANISATION/INSTITUTE") {
							temp[`Employment ${employmentCount} - Organisation/Institute`] = e.content;
						  } else if (fieldTitle === "ADDITIONAL REMARKS (ABOUT EXPERIENCE, IF ANY)") {
          temp[`Employment ${employmentCount} - Additional Remarks`] = e.content;

						  }
						}
					  } else if (entry.field && entry.field.title === "Your 5 (Five) most important research publications") {
						publicationCount++
						for (const e of entry.entries) {
						  const fieldTitle = e.field!.title.toUpperCase();
						  if (fieldTitle === "YEAR, VOL. NO. PAGE") {
							temp[`Research Publication ${publicationCount} - Year, Vol. No. Page`] = e.content;
						  } else if (fieldTitle === "NAME OF ALL AUTHORS (FIRST NAME FOLLOWED BY LAST NAME)") {
							temp[`Research Publication ${publicationCount} - Authors`] = e.content;
						  } else if (fieldTitle === "TITLE OF THE RESEARCH PAPER") {
							temp[`Research Publication ${publicationCount} - Title`] = e.content;
						  } else if (fieldTitle === "NAME OF THE JOURNAL/CONFERENCE") {
							temp[`Research Publication ${publicationCount} - Journal/Conference`] = e.content;
						  } else if (fieldTitle === "LATEST H- INDEX**/H-5 INDEX*** AND/OR CORE RANK OF THE JOURNAL/CONFERENCE****") {
							temp[`Research Publication ${publicationCount} - H-Index/Core Rank`] = e.content;
						  } else if (fieldTitle === "LATEST IMPACT FACTOR OF JOURNALS") {
							temp[`Research Publication ${publicationCount} - Impact Factor`] = e.content;
						  }
						}
					  }
				  
				}
				// Add count fields
				temp["Number of Employment Entries"] = employmentCount.toString()
				temp["Number of Research Publication Entries"] = publicationCount.toString()

			data.push(temp)

		}

		console.log(data)

		

		// add fields here using title from Field table in lowercase to make it appear in csv file
		const fields = [
			"application ID",

			"full name",
			"permanent address",
			"address for correspondence",
			"pin code (for correspondence address)",
			"gender",
			"maritial status",
			"mobile no.",
			"email id",
			"category",
			"Are you a citizen of India by birth or by domicile?",
			"do you belong to the pwd category?",
			"date of birth",
			"age as on closing Date of advertizement",
			"basic pay and scale",
			"father's/husbad's name name",
			"mother's name",
			"advt. No.",
			"field of specialization",
			"time would you need before joining the post?",

			"department",
			"position",

			"exam/degree/diploma passed (10th)",
			"year of passing (10th)",
			"percentage of marks/ cpi (10th)",
			"board/university/institution (10th)",
			"exam/degree/diploma passed (12th)",
			"year of passing (12th)",
			"percentage of marks/ cpi (12th)",
			"board/university/institution (12th)",
			"exam/degree/diploma passed (bachelors)",
			"year of passing (bachelors)",
			"percentage of marks/ cpi (bachelors)",
			"board/university/institution (bachelors)",
			"exam/degree/diploma passed (masters)",
			"year of passing (masters)",
			"percentage of marks/ cpi (masters)",
			"board/university/institution (masters)",
			 

            "No of PG Project Giuded",
			"No of PhD thesis gouded(Completed)",
			"No of PhD thesis gouded(Ongoing)",
			"No. of Projects involved in (Sponsored) ",
			"No. of Projects involved in (Consultancy)",
			"no. of patents",
			"No. of publications in journals (refereed, national)",
			"No. of publications in journals (refereed, international)",
			"No. of publications in conferences (refereed, national)",
			"No. of publications in conferences (un-refereed, national)",
			"No. of technical reports",
			"no. of citations of published papers",
			"no. of publications in conferences (refereed, international)",
			"no. of publications in conferences (un-refereed, international)",
			"books published",
			"book chapters",

			"teaching experience (in years)",
			"no of courses taught",
			"area of specialization",
			"title of PhD thesis",
			"PhD supervisor",
			"PhD co-supervisor",
			"date of thesis submission",
			"date of viva-voce",

			"awards and honours",
			"fellow of professional body",
			"member of professional body",
			"editorial board memeberships",
			"seminar/conferenced organized",

			"did you applied before?",
			"additional remarks",
			"referrer 1",
			"designation of referrer 1",
			"address of referrer 1",
			"email of referrer 1",
			"referrer 2",
			"designation of referrer 2",
			"address of referrer 2",
			"email of referrer 2",
			"referrer 3",
			"designation of referrer 3",
			"address of referrer 3",
			"email of referrer 3",
			"do you have any legal proceeding ongoing",
			"been charged acquitted or convicted by a court of law in India or outside India",
			"declaration",
		]

		// Add dynamic fields for Employment and Research Publications
const maxEmployment = 2 // Adjust this number as needed
const maxPublications = 5 // As per the table name

for (let i = 1; i <= maxEmployment; i++) {
	fields.push(`Employment ${i} - Last Pay & Scale of Pay`)
	fields.push(`Employment ${i} - Position Held`)
	fields.push(`Employment ${i} - Date of Leaving`)
	fields.push(`Employment ${i} - Date of Joining`)
	fields.push(`Employment ${i} - Nature of Duties/Work`)
	fields.push(`Employment ${i} - Organisation/Institute`)
	fields.push(`Employment ${i} - Additional Remarks`)
  }
  
  for (let i = 1; i <= maxPublications; i++) {
	fields.push(`Research Publication ${i} - Year, Vol. No. Page`)
	fields.push(`Research Publication ${i} - Authors`)
	fields.push(`Research Publication ${i} - Title`)
	fields.push(`Research Publication ${i} - Journal/Conference`)
	fields.push(`Research Publication ${i} - H-Index/Core Rank`)
	fields.push(`Research Publication ${i} - Impact Factor`)
  }


		const parser = new Parser({fields})
		const csv = parser.parse(data)
		// fs.writeFileSync("./templates/export.csv", csv)
		const csvBuf = Buffer.from(csv)

		res.setHeader("Content-Type", "application/csv")
		res.setHeader("Content-Disposition", `attachment; filename=report.csv`)
		res.send(csvBuf)
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Error generating preview" })
	}
}





