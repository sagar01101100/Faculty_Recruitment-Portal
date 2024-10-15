
//superinput.tsx
import Confetti from 'react-confetti'
import { useState, useRef, FormEvent, useEffect, MouseEvent } from "react"
import { TableData, TableSchema } from "./superInput/types"
import { Field, ReferralField } from "@prisma/client"
import {
	FormControl,
	FormLabel,
	Button,
	Heading,
	useToast,
	Box,
	Center,
	HStack,
	useColorModeValue,
	useBreakpointValue,
	useBoolean,
	Tooltip,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
} from "@chakra-ui/react"
import { SuperInput } from "./superInput"
import { SuperFormData } from "../lib/formEntries"
import request, { ResponseError } from "superagent"
import router, { useRouter } from "next/router"
import Sidebar from "../components/sidebar"
import { LoadingToast } from "./loadingToast"
import { Card } from "./card"
import { MapType } from "../lib/formEntries"
import { useConfirmation } from "../lib/dirtyFormState"
import { InfoIcon } from "@chakra-ui/icons"
import { time } from 'console'


type FormFields = (Field & {
	fields: Field[]
})[]

/**
entries: [
		{ fieldId: 1, content: "Mary" },
		[
			{ fieldId: 2, entries: [{ content: "c1", fieldId: 4 }] },
			{ fieldId: 2, entries: [{ content: "c2", fieldId: 4 }] },
		],
		{ fieldId: 3, content: "2020-11-04" },
	],
*/

export function SuperInputForm(props: {
	fields: FormFields | ReferralField[]
	onSave: (data: SuperFormData) => void
	onSubmit?: () => void
	fieldGroups?: {
		id: number
		title: string
		description: string | null
		fields: Field[]
	}[]
	currentGroup?: number
	showSidebar: boolean
	isReferral: boolean
}) {
	const ref = useRef<HTMLButtonElement>(null)
	const [data, setData] = useState<{ [key: number]: MapType }>({})
	const [dirtyState, setDirtyState] = useBoolean(false)
	const [progress, setProgress] = useState<
		{ fieldGroupId: number; progress: number }[] | undefined
	>()
	const [files, setFiles] = useState<{ [key: number]: MapType }>({})
	const toast = useToast()
	const sidebarBreakpoint = useBreakpointValue({
		xl: "sidebar",
		base: "closed",
	})
	const formBreakpoint = useBreakpointValue({
		xl: "row",
		base: "column",
	})
	const router = useRouter()
	const { id } = router.query
	const [allFields, setAllFields] = useState<FormFields>()
	const [confDialogVis, setConfDialog] = useBoolean(false)
	const [downloading, setDownloading] = useState(false)
	const [showConfetti, setShowConfetti] = useState(false)

	const [autosavetime, setAutosaveTime] = useState(120); // 120 seconds or 2 minutes

	useEffect(() => {
		const interval = setInterval(() => {
			setAutosaveTime((prevTime) => {
				if (prevTime - 10 <= 0) {
					document.getElementById('auto_save')?.click();
					toast({
						title: "Auto Progress",
						description: `Your Progress has been saved Automatically`,
						status: "success",
						duration: 5000,
						isClosable: true,
					});
					return 120; // Reset to 120 seconds
				} else {
					return prevTime - 10;
				}
			});
		}, 10000); // Interval runs every 10 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []); // Empty dependency array ensures the interval runs only once when the component mounts


	const onSubmit = (
		e:
			| FormEvent<HTMLFormElement>
			| MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault()

		let formData: SuperFormData = { entries: {} }

		for (const key in { ...data, ...files }) {
			const check = TableSchema.safeParse(data[key])

			if (!check.success) {
				const element = {
					fieldId: parseInt(key),
					content: files[key]
						? files[key].content
						: data[key].content.toString(),
					isFile: files[key] ? true : false,
					required: files[key]
						? files[key].required
						: data[key].required,
				}

				formData.entries[key] = element
			} else {
				let finalEntries: TableData[] = []

				for (let temp in check.data) {
					console.count("table")
					if (check.data[temp].entries.length !== 0) {
						finalEntries.push(check.data[temp])
					}
					//  else {
					// 	finalEntries.push([])
					// }
				}

				formData.entries[key] = finalEntries
			}
		}
		setDirtyState.off()
		props.onSave(formData)
	}

	const showConfDialog = async () => {
		try {
			setDownloading(true)
			const res = await request
				.post("/api/preview")
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("auth-token")}`
				)
				.send({
					snapshotId: router.query.snapshotId,
					draft: true,
				})
				.responseType("blob")
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
				link.download = "final.pdf"
				link.click()

				// For Firefox it is necessary to delay revoking the ObjectURL.
				setTimeout(() => {
					window.URL.revokeObjectURL(objUrl)
				}, 250)
			}
			setDownloading(false)
			setConfDialog.on()
		} catch (e) {
			console.log(JSON.stringify(e, null, 4))
			if ((e as any).status === 500) {
				toast({
					title: "Error",
					description: `Please complete all fields in form to submit`,
					status: "error",
					duration: 9000,
					isClosable: true,
				})
			} else {
				toast({
					title: "Error",
					description: `${e}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				})
			}
			setDownloading(false)
		}
	}

	const submitForm = async () => {
		try {
			const res = await request
				.post("/api/submit")
				.send({
					snapshotId: router.query.snapshotId as string,
				})
				.set(
					"Authorization",
					"Bearer " + localStorage.getItem("auth-token")
				)
			setDirtyState.off()
			props.onSubmit != undefined ? props.onSubmit() : null
		} catch (e) {
			const fgid = (e as ResponseError).response?.body?.fieldGroupId
			toast({
				title: "Incomplete Form",
				description: fgid
					? `Cannot submit, ${props.fieldGroups?.find((fg) => fg.id === fgid)
						?.title
					} has incomplete entries`
					: (e as ResponseError).response?.body.error,
				status: "error",
				duration: 9000,
				isClosable: true,
			})
		}
	}





	const sendConfirmationMail = async () => {
		try {
			console.log("sendConfirmationMail function is called...");

			// First fetch the user's email from your API
			const emailRes = await request.post("../api/fetch_email")
				.send({
					snapshotId: router.query.snapshotId as string,
				})
				.set(
					"Authorization",
					"Bearer " + localStorage.getItem("auth-token")
				);

			const userEmail = emailRes.body.email;

			// Sending confirmation email
			await request.post("../api/confirmation_mail").send({
				email: userEmail, // Use the fetched email
			});

			setDirtyState.off();
			props.onSubmit != undefined ? props.onSubmit() : null;

			// Show confetti
			setShowConfetti(true);

			// Hide confetti after 5 seconds
			setTimeout(() => {
				setShowConfetti(false);
				if (props.onSubmit) {
					props.onSubmit();
				} else {
					router.push("/home");  // Redirect to home page after 5 seconds
				}
			}, 5000);

			toast({
				title: "Success",
				description: "Form submitted successfully!",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (e) {
			const fgid = (e as ResponseError).response?.body?.fieldGroupId;
			toast({
				title: "Failed to send a mail",
				description: fgid
					? `Cannot submit, ${props.fieldGroups?.find((fg) => fg.id === fgid)
						?.title
					} has incomplete entries`
					: (e as ResponseError).response?.body?.error,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};





	// useEffect(() => {
	// 	if (props.isReferral) return

	// 	const loadingToast = toast({
	// 		render: (props) => <LoadingToast {...props}>Hello</LoadingToast>,
	// 		// duration: 0,
	// 		isClosable: true,
	// 	})

	// 	const token = localStorage.getItem("auth-token")

	// 	if (!token) {
	// 		toast.close(loadingToast!)
	// 		router.replace("/")
	// 		return
	// 	}

	// 	toast.update(loadingToast!, {
	// 		render: (props) => (
	// 			<LoadingToast {...props}>Retrieving fields</LoadingToast>
	// 		),
	// 	})

	// 	console.log(router.query.snapshotId)

	// 	request
	// 		.post("/api/user")
	// 		.set(
	// 			"Authorization",
	// 			"Bearer " + localStorage.getItem("auth-token")
	// 		)
	// 		.send({
	// 			snapshotId: router.query.snapshotId,
	// 		})
	// 		.then((res) => {
	// 			//
	// 			//
	// 			setData((data) => {
	// 				return { ...data, ...res.body.entries }
	// 			})
	// 			setProgress(res.body.finalProgress)
	// 			toast.close(loadingToast!)
	// 			if (Object.keys(res.body.entries).length != 0) {
	// 				toast({
	// 					title: "Success",
	// 					description: "Fields retrieved",
	// 					status: "success",
	// 					isClosable: true,
	// 				})
	// 			}
	// 		})
	// 		.catch((err) => { })
	// }, [])

	useEffect(() => {
		if (props.isReferral) return

		const loadingToast = toast({
			render: (props) => <LoadingToast {...props}>Hello</LoadingToast>,
			isClosable: true,
		})

		const token = localStorage.getItem("auth-token")

		if (!token) {
			toast.close(loadingToast!)
			router.replace("/")
			return
		}

		toast.update(loadingToast!, {
			render: (props) => (
				<LoadingToast {...props}>Retrieving fields</LoadingToast>
			),
		})

		console.log(router.query.snapshotId)

		request
			.post("/api/user")
			.set(
				"Authorization",
				"Bearer " + localStorage.getItem("auth-token")
			)
			.send({
				snapshotId: router.query.snapshotId,
			})
			.then((res) => {
				setData((data) => {
					return { ...data, ...res.body.entries }
				})
				setFiles((files) => {
					const newFiles = { ...files };
					for (const key in res.body.entries) {
						if (res.body.entries[key].isFile) {
							newFiles[key] = res.body.entries[key];
						}
					}
					return newFiles;
				})
				setProgress(res.body.finalProgress)
				toast.close(loadingToast!)
				if (Object.keys(res.body.entries).length != 0) {
					toast({
						title: "Success",
						description: "Fields retrieved",
						status: "success",
						isClosable: true,
					})
				}
			})
			.catch((err) => { })
	}, [])


	return (
		<>
			{showConfetti && (<Confetti />)}
			<Modal
				isOpen={confDialogVis}
				onClose={() => {
					setConfDialog.off();
				}}
				scrollBehavior="inside"
			>
				<ModalOverlay />
				<ModalContent overflow={"scroll"} p={5} maxW="90vw">
					<Heading>Preview Submission</Heading>
					Please check the downloaded document file. If you are satisfied with the document generated, click Submit to submit the form.
					<ModalFooter>
						<Button
							variant={"solid"}
							colorScheme="green"

							onClick={async () => {
								await sendConfirmationMail();
								setConfDialog.off();
							}}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>


			<Box display={"flex"} flexDirection={{ xl: "row", base: "column" }}>
				{props.showSidebar && (
					<Sidebar

						variant={sidebarBreakpoint ?? "sidebar"}
						fieldGroups={props.fieldGroups!}
						currentGroup={props.currentGroup}
						fieldGroupProgress={[]}
						fields={props.fields as FormFields}
						progress={progress}
						onClick={() => { }}
						downloading={downloading}
						onSubmit={() => {
							showConfDialog()
						}}
					/>
				)}
				<Box
					maxW={{ base: "100vw", xl: "5xl" }}
					width={"100vw"}
					mx="auto"
				>
					{props.isReferral ? null : (
						<Center my={10}>
							<Heading>
								{props.fieldGroups
									?.find((fg) => fg.id == props.currentGroup)!
									.title.toUpperCase()}
							</Heading>
						</Center>
					)}
					<Card>
						{props.fields.length > 0 ? (
							<>
								<Box
									p={2}
									overflowY={"scroll"}
									maxH={"600px"}
									css={{
										"&::-webkit-scrollbar": {
											height: "8px",
											width: "4px",
										},
										"&::-webkit-scrollbar-track": {
											height: "8px",
											width: "4px",
										},
										"&::-webkit-scrollbar-thumb": {
											background: "white",
											borderRadius: "24px",
										},
									}}
								>
									<form
										onSubmit={(e) => {
											onSubmit(e)
											if (
												Array.isArray(id) ||
												props.isReferral
											)
												return
											let i = 0
											for (
												;
												i < props.fieldGroups!.length;
												i++
											) {
												if (
													props.fieldGroups![i].id ===
													parseInt(id!)
												) {
													setDirtyState.off()
													router.push(
														`/${router.query
															.snapshotId
														}/form?id=${props.fieldGroups![
															i + 1
														].id
														}`
													)
													break
												}
											}
										}}
									>
										{props.fields?.map((field) => (
											<FormControl
												id={field.title}
												isRequired={
													props.isReferral
														? true
														: (field as Field)
															.isRequired
												}
												key={field.id}
												my={5}
											>
												<FormLabel>
													{field.title}{" "}
													{field.description !=
														null ? (
														<Tooltip
															label={
																field.description
															}
														>
															<InfoIcon
																color={
																	"green.300"
																}
															/>
														</Tooltip>
													) : null}
												</FormLabel>
												<SuperInput
													type={field.type}
													placeholder={`Enter ${field.title} here...`}
													onChoose={(e) => {
														setDirtyState.on()
														setData((prev) => {
															return {
																...prev,
																[field.id]: e,
															}
														})
													}}
													label={field.title}
													options={
														props.isReferral
															? undefined
															: (
																field as Field
															).choices.map(
																(
																	choice
																) => ({
																	content:
																		choice,
																	required:
																		false,
																})
															)
													}
													value={data[field.id]}
													fields={
														props.isReferral
															? undefined
															: (
																field as Field & {
																	fields: Field[]
																}
															).fields
													}
													fieldId={field.id}
													allowFile={field?.allowFile}
													onChooseFile={(file) => {
														console.log(
															file,
															field.id
														)
														if (
															file === undefined
														) {
															const temp = {
																...data,
															}
															delete temp[
																field.id
															]
															setData(temp)

															const temp2 = {
																...files,
															}
															delete temp[
																field.id
															]
															setFiles(temp)
														} else {
															setFiles({
																...files,
																[field.id]:
																	file,
															})
														}
													}}
													isReadonly={
														data[field.id]?.required
													}
													isRequired={
														props.isReferral
															? false
															: (field as Field)
																.isRequired
													}
												/>
											</FormControl>
										))}
										<Button
											type="submit"
											colorScheme={"teal"}
											ref={ref}
											display={"none"}
										>
											Submit
										</Button> 
										
									</form>
								</Box>
								<HStack
									mt={5}
									align={"flex-end"}
									justify={"flex-end"}
									display={"flex"}
								>
									{props.isReferral ? null : (
										<>


											<p style={{ fontSize: '12px', color: '#ccc' }}>
												Auto Progress in {Math.floor(autosavetime / 60)} Minutes and {autosavetime % 60} seconds
											</p>

											<Button id='auto_save'
												variant="ghost"
												colorScheme={"teal"}
												onClick={(e) => {
													onSubmit(e)
												}}
											>
												Save Progress
											</Button>
										</>
									)}
									<Button
										type="submit"
										colorScheme={"teal"}
										onClick={() => {
											if (props.fieldGroups !== undefined && props.fieldGroups.length === parseInt(id!)) {
												showConfDialog()
											} else {

												if (ref.current) {
													ref.current.click()
												}
											}
										}}
									>
										{props.isReferral
											? "Submit Referral"
											: "Complete and Next"}
									</Button>
								</HStack>
							</>
						) : (
							<Heading>
								No fields! Please select a field group
							</Heading>
						)}
					</Card>
				</Box>
			</Box>
		</>
	)
}
