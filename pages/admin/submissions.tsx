

// Naitik Raj Code with Search Functions

import React, { useEffect, useState, MouseEvent } from "react"
import {
	Button,
	Box,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Checkbox,
	ButtonGroup,
	Spinner,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BsDownload } from "react-icons/bs"
import request from "superagent"

export const getServerSideProps = async (context) => {
	const submissions = await prisma.snapshot.findMany({
		orderBy: {
			id: "asc",
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

	return {
		props: {
			submissions,
		},
	}
}

const downloadSomeFileType = async (
	api,
	row,
	checkedIds,
	snapshotId
) => {
	if (api === "/api/admin/generate-csv") {
		var res = await request
			.post(api)
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("admin-token")}`
			)
			.send({ ids: checkedIds })
			.responseType("blob")
	} else {
		var res = await request
			.post(api)
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("admin-token")}`
			)
			.send({ id: row.id, snapshotId: snapshotId })
			.responseType("blob")
	}
	if (res.statusCode >= 300) {
		return
	}
	if (
		window.navigator &&
		// @ts-expect-error
		window.navigator.msSaveOrOpenBlob
	) {
		// @ts-expect-error
		window.navigator.msSaveOrOpenBlob(res.body)
	} else {
		// For other browsers: create a link pointing to the ObjectURL containing the blob.
		const objUrl = window.URL.createObjectURL(res.body)
		let link = document.createElement("a")
		link.target = "_blank"
		link.rel = "noopener noreferrer"
		link.href = objUrl
		api === "/api/generate"
			? (link.download = "filled-form.docx")
			: api === "/api/admin/generate-zip"
			? (link.download = row.name + ".zip")
			: (link.download = "submissions.csv")
		link.click()
		// For Firefox it is necessary to delay revoking the ObjectURL.
		setTimeout(() => {
			window.URL.revokeObjectURL(objUrl)
		}, 250)
	}
}

export default function Submissions(props) {
	const [checkedIds, setCheckedIds] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const router = useRouter()

	// Function to filter the submissions based on search term
	const filteredSubmissions = props.submissions.filter((submission) => {
		const term = searchTerm.toLowerCase()
		return (
			submission.id.toLowerCase().includes(term) ||
			submission.user.name.toLowerCase().includes(term) ||
			submission.department.name.toLowerCase().includes(term)
		)
	})

	return (
		<>
			<Box
				m={10}
				border="1px solid"
				borderColor="gray.600"
				borderRadius="md"
				padding={5}
			>
				<input
					type="text"
					placeholder="Search by ID, Name, or Department"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{
						marginBottom: "20px",
						padding: "10px",
						borderRadius: "5px",
						border: "1px solid #ccc",
						width: "100%",
					}}
				/>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>
								<Checkbox
									isIndeterminate={
										checkedIds.length !== 0 &&
										checkedIds.length !==
											props.submissions.length
									}
									isChecked={
										checkedIds.length !== 0 &&
										checkedIds.length ===
											props.submissions.length
									}
									onChange={(e) => {
										if (e.target.checked) {
											setCheckedIds(
												props.submissions.map(
													(user) => user.id
												)
											)
										} else {
											setCheckedIds([])
										}
									}}
								/>
							</Th>
							<Th>Application id</Th>
							<Th>Name</Th>
							<Th>Email</Th>
							<Th>Department</Th>
							<Th>Position</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredSubmissions.length > 0 ? (
							filteredSubmissions.map((row, ind) => (
								<Tr key={ind}>
									<Td>
										<Checkbox
											isChecked={checkedIds.includes(
												row.id
											)}
											onChange={(e) => {
												if (e.target.checked) {
													const newList = [
														...checkedIds,
														row.id,
													]
													setCheckedIds(newList)
												} else {
													const newList = [
														...checkedIds,
													]
													newList.splice(
														newList.indexOf(row.id),
														1
													)
													setCheckedIds(newList)
												}
											}}
										></Checkbox>
									</Td>
									<Td>{row.id}</Td>
									<Td>{row.user.name}</Td>
									<Td>{row.user.email}</Td>
									<Td>{row.department.name}</Td>
									<Td>{row.position.name}</Td>
									<Td>
										<ButtonGroup>
											<Button
												leftIcon={<BsDownload />}
												onClick={(e) => {
													downloadSomeFileType(
														"/api/generate",
														row.user,
														undefined,
														router.query
															.snapshotId
													)
												}}
											>
												Download Form
											</Button>
											<Button
												leftIcon={<BsDownload />}
												onClick={(e) => {
													downloadSomeFileType(
														"/api/admin/generate-zip",
														row.user,
														undefined,
														router.query
															.snapshotId
													)
												}}
											>
												Download Zip
											</Button>
										</ButtonGroup>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={7} style={{ textAlign: "center" }}>
									<Spinner />
									<p>No results found</p>
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</Box>
			{checkedIds.length > 0 && (
				<Button
					ml={10}
					onClick={(e) => {
						downloadSomeFileType(
							"/api/admin/generate-csv",
							undefined,
							checkedIds
						)
					}}
				>
					View submissions
				</Button>
			)}
		</>
	)
}







// Previous Version

// import {
// 	Button,
// 	Box,
// 	ThemeProvider,
// 	extendTheme,
// 	Table,
// 	TableCaption,
// 	Tbody,
// 	Tr,
// 	Th,
// 	Td,
// 	ThemeDirection,
// 	Thead,
// 	Tfoot,
// 	Spinner,
// 	Checkbox,
// 	ButtonGroup,
// } from "@chakra-ui/react"
// import React, { useEffect, useState, MouseEvent } from "react"
// import {
// 	BsBarChartLine,
// 	BsBarChartLineFill,
// 	BsFolderSymlinkFill,
// 	BsUiChecks,
// } from "react-icons/bs"
// import { FieldGroup } from "@prisma/client"
// import { GetServerSideProps } from "next"
// import { useRouter } from "next/router"
// import prisma from "../../lib/prisma"
// import Link from "next/link"
// import FormWidget from "../../components/formWidget"
// import request from "superagent"
// import { Card } from "../../components/card"
// import { Sidebar } from "../../components/admin/sidebar"
// import { HomeIcon } from "../../components/Icons/Icons"
// import { BsDownload } from "react-icons/bs"

// const theme = extendTheme({
// 	styles: {
// 		global: {
// 			body: {
// 				bg: "blue.100",
// 			},
// 		},
// 	},
// })

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const submissions = await prisma.snapshot.findMany({
// 		orderBy: {
// 			id: "asc",
// 		},
// 		select: {
// 			id: true,
// 			user: {
// 				select: {
// 					id: true,
// 					name: true,
// 					email: true,
// 				},
// 			},
// 			department: {
// 				select: {
// 					name: true,
// 				},
// 			},
// 			position: {
// 				select: {
// 					name: true,
// 				},
// 			},
// 		},
// 	})

// 	return {
// 		props: {
// 			submissions,
// 		},
// 	}
// }

// const downloadSomeFileType = async (
// 	api: string,
// 	row?: { id: string; name: string; email: string },
// 	checkedIds?: string[],
// 	snapshotId?: string
// ) => {
// 	if (api === "/api/admin/generate-csv") {
// 		var res = await request
// 			.post(api)
// 			.set(
// 				"Authorization",
// 				`Bearer ${localStorage.getItem("admin-token")}`
// 			)
// 			.send({ ids: checkedIds })
// 			.responseType("blob")
// 	} else {
// 		var res = await request
// 			.post(api)
// 			.set(
// 				"Authorization",
// 				`Bearer ${localStorage.getItem("admin-token")}`
// 			)
// 			.send({ id: row!.id, snapshotId: snapshotId })
// 			.responseType("blob")
// 	}
// 	if (res.statusCode >= 300) {
// 		return
// 	}
// 	if (
// 		window.navigator &&
// 		// @ts-expect-error
// 		window.navigator.msSaveOrOpenBlob
// 	) {
// 		// @ts-expect-error
// 		window.navigator.msSaveOrOpenBlob(res.body)
// 	} else {
// 		// For other browsers: create a link pointing to the ObjectURL containing the blob.
// 		const objUrl = window.URL.createObjectURL(res.body)
// 		let link = document.createElement("a")
// 		link.target = "_blank"
// 		link.rel = "noopener noreferrer"
// 		link.href = objUrl
// 		api === "/api/generate"
// 			? (link.download = "filled-form.docx")
// 			: api === "/api/admin/generate-zip"
// 			? (link.download = row!.name + ".zip")
// 			: (link.download = "submissions.csv")
// 		link.click()
// 		// For Firefox it is necessary to delay revoking the ObjectURL.
// 		setTimeout(() => {
// 			window.URL.revokeObjectURL(objUrl)
// 		}, 250)
// 	}
// }

// export default function Submissions(props: {
// 	submissions: {
// 		id: string
// 		user: {
// 			id: string
// 			name: string
// 			email: string
// 		}
// 		department:{
// 			name: string
// 		}
// 		position: {
// 			name: string
// 		}
// 	}[]
// }) {
// 	const [checkedIds, setCheckedIds] = useState<string[]>([])
// 	const router = useRouter()

// 	return (
// 		<>
// 			<Box
// 				m={10}
// 				border="1px solid"
// 				borderColor="gray.600"
// 				borderRadius="md"
// 				padding={5}
// 			>
// 				<Table variant="simple">
// 					<Thead>
// 						<Tr>
// 							<Th>
// 								<Checkbox
// 									isIndeterminate={
// 										checkedIds.length !== 0 &&
// 										checkedIds.length !==
// 											props.submissions.length
// 									}
// 									isChecked={
// 										checkedIds.length !== 0 &&
// 										checkedIds.length ===
// 											props.submissions.length
// 									}
// 									onChange={(e) => {
// 										if (e.target.checked) {
// 											setCheckedIds(
// 												props.submissions.map(
// 													(user) => user.id
// 												)
// 											)
// 										} else {
// 											setCheckedIds([])
// 										}
// 									}}
// 								/>
// 							</Th>
// 							<Th>Application id</Th>
// 							<Th>Name</Th>
// 							<Th>Email</Th>
// 							<Th>Department</Th>
// 							<Th>Position</Th>
// 							<Th>Actions</Th>
// 						</Tr>
// 					</Thead>
// 					<Tbody>
// 						{props.submissions !== undefined ? (
// 							props.submissions.map((row, ind) => (
// 								<Tr key={ind}>
// 									<Td>
// 										<Checkbox
// 											isChecked={checkedIds.includes(
// 												row.id
// 											)}
// 											onChange={(e) => {
// 												if (e.target.checked) {
// 													const newList = [
// 														...checkedIds,
// 														row.id,
// 													]
// 													setCheckedIds(newList)
// 												} else {
// 													const newList = [
// 														...checkedIds,
// 													]
// 													newList.splice(
// 														newList.indexOf(row.id),
// 														1
// 													)
// 													setCheckedIds(newList)
// 												}
// 											}}
// 										></Checkbox>
// 									</Td>
// 									<Td>{row.id}</Td>
// 									<Td>{row.user.name}</Td>
// 									<Td>{row.user.email}</Td>
// 									<Td>{row.department.name}</Td>
// 									<Td>{row.position.name}</Td>
// 									<Td>
// 										<ButtonGroup>
// 											<Button
// 												leftIcon={<BsDownload />}
// 												onClick={(e) => {
// 													downloadSomeFileType(
// 														"/api/generate",
// 														row.user,
// 														undefined,
// 														router.query
// 															.snapshotId as string
// 													)
// 												}}
// 											>
// 												Download Form
// 											</Button>
// 											<Button
// 												leftIcon={<BsDownload />}
// 												onClick={(e) => {
// 													downloadSomeFileType(
// 														"/api/admin/generate-zip",
// 														row.user,
// 														undefined,
// 														router.query
// 															.snapshotId as string
// 													)
// 												}}
// 											>
// 												Download Zip
// 											</Button>
// 										</ButtonGroup>
// 									</Td>
// 								</Tr>
// 							))
// 						) : (
// 							<Tr>
// 								<Spinner />
// 							</Tr>
// 						)}
// 					</Tbody>
// 				</Table>
// 			</Box>
// 			{checkedIds.length > 0 && (
// 				<Button
// 					ml={10}
// 					onClick={(e) => {
// 						downloadSomeFileType(
// 							"/api/admin/generate-csv",
// 							undefined,
// 							checkedIds
// 						)
// 					}}
// 				>
// 					View submissions
// 				</Button>
// 			)}
// 		</>
// 	)
// }

