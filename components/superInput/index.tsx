//superInput.tsx
import{
	FormControl,
	Input,
	FormLabel,
	RadioGroup,
	Radio,
	Flex,
	Stack,
	CheckboxGroup,
	Checkbox,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Spinner,
	Button,
	Text,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	HStack,
	VStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Portal,
	Textarea,
	useBoolean,
	useToast,
	FormErrorMessage,
	FormHelperText,
	Box,
	IconButton,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	ButtonGroup,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputField,
	NumberInputStepper,
	NumberInput,
	Tag,
	TagCloseButton,
} from "@chakra-ui/react"
import { Entry, Field } from "@prisma/client"
import request from "superagent"
import dayjs from "dayjs"
import { FormEvent, useEffect, useRef, useState, MouseEvent } from "react"
import Tiptap from "../Tiptap"
import { Upload } from "../upload"
import { EntryModel, FieldModel } from "../../prisma/zod"
import {
	DateInputPropsSchema,
	DefaultInputPropsSchema,
	RadioInputPropsSchema,
	SelectInputPropsSchema,
	SuperInputProps,
	SuperInputPropsSchema,
	TableData,
	TableInputPropsSchema,
	RichInputPropsSchema,
	NumberInputPropsSchema,
} from "./types"
import { DatePicker } from "../datePicker"
import { date, z } from "zod"
import {
	ChevronDownIcon,
	EditIcon,
	EmailIcon,
	DeleteIcon,
} from "@chakra-ui/icons"
import { mapToTabledata, tableDataToMap, MapType } from "../../lib/formEntries"
import { BsPencilSquare } from "react-icons/bs"
import { useRouter } from "next/router"





export function SuperInput<T>(props: SuperInputProps<T>) {
	const [file, setFile] = useState<string | undefined>(undefined)
	// Add a new state to store the file name
	const [fileName, setFileName] = useState<string | undefined>(undefined)


	return (
		<>
			{!file &&
				(() => {
					try {
						switch (props.type) {
							case "string":
								return (
									<DefaultInput
										{...DefaultInputPropsSchema.parse(
											props
										)}
									/>
								)

							case "date":
								const inputProps =
									DateInputPropsSchema.parse(props)
								return <DatePicker {...inputProps} />
							case "select":
								return (
									<RadioInput
										{...RadioInputPropsSchema.parse(props)}
									/>
								)
							case "multi":
								return (
									<SelectInput
										{...SelectInputPropsSchema.parse(props)}
									/>
								)
							case "table":
								return (
									<TableInput
										{...TableInputPropsSchema.parse(props)}
									/>
								)
							case "rich":
								return (
									<RichInput
										{...RichInputPropsSchema.parse(props)}
									/>
								)
							case "referral":
								return <ReferralInput />
							case "number":
								return (
									<SuperNumberInput
										{...NumberInputPropsSchema.parse(props)}
									/>
								)
							case "textarea":
								return (
									<TextAreaInput
										{...DefaultInputPropsSchema.parse(
											props
										)}
									/>
								)
							case "none":
								return null
						}
					} catch (e) {
						return <div>Error</div>
					}
				})()}
			{props.allowFile && (
				<>
					<Upload
						onSelect={(file) => {
							setFile(file)
							if (props.onChooseFile !== undefined) {
								if (file === undefined) {
									props.onChooseFile(undefined)
								} else {
									props.onChooseFile({
										content: file,
										required: false,
									})
								}
							}
						}}
						isReadonly={props.isReadonly}
						// @ts-expect-error
						intialFile={props.value?.content as unknown as string}
						title={""}
					/>
					<hr></hr>
				</>
			)}
		</>
	)
}

function DefaultInput(props: SuperInputProps<MapType>) {
	return (
		<Input
			type="text"
			value={props.value?.content}
			placeholder={
				(props.placeholder?.length ?? 0) > 40
					? undefined
					: props.placeholder
			}
			focusBorderColor="teal.400"
			onChange={(e) =>
				props.onChoose({ content: e.target.value, required: false })
			}
			readOnly={props.isReadonly}
			isRequired={props.isRequired}
			required={props.isRequired}
		/>
	)
}

function TextAreaInput(props: SuperInputProps<MapType>) {
	return (
		<Textarea
			type="text"
			value={props.value?.content}
			placeholder={props.placeholder}
			onChange={(e) =>
				props.onChoose({ content: e.target.value, required: false })
			}
			readOnly={props.isReadonly}
			focusBorderColor="teal.400"
			isRequired={props.isRequired}
			required={props.isRequired}
		/>
	)
}

function RadioInput(props: SuperInputProps<MapType>) {
	const toast = useToast()
	const [isOpen, setOpen] = useBoolean(false)
	return (
		<>
			<Popover isOpen={isOpen} autoFocus={false} colorScheme={"red"}>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton
						onClick={() => {
							setOpen.off()
						}}
					/>
					<PopoverHeader>Incomplete</PopoverHeader>
				</PopoverContent>
			</Popover>
			<input
				style={{ display: "none" }}
				value={props.value?.content}
				required={props.isRequired}
				onInvalid={() => {
					setOpen.on()
				}}
			/>
			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<ChevronDownIcon />}
					colorScheme={"teal"}
				>
					{props.value?.content ?? "Select"}
				</MenuButton>
				<Portal>
					<MenuList>
						{props.options?.map((option, index) => (
							<MenuItem
								key={index}
								onClick={() => {
									props.onChoose(option)
									setOpen.off()
								}}
							>
								{option.content}
							</MenuItem>
						))}
					</MenuList>
				</Portal>
			</Menu>
		</>
	)
}

function SelectInput(props: SuperInputProps<MapType>) {
	return (
		<CheckboxGroup
			onChange={(val) =>
				props.onChoose({ content: val.toString(), required: false })
			}
			value={props.value?.content.split(",")}
			colorScheme={"teal"}
		>
			<Stack direction="row" spacing={4}>
				{props.options?.map((option) => (
					// @ts-ignore
					<Checkbox value={option} key={option} colorScheme={"teal"}>
						{option.content}
					</Checkbox>
				))}
			</Stack>
		</CheckboxGroup>
	)
}

function TableInput(props: SuperInputProps<TableData[]>) {
	const router = useRouter()
	const [data, setData] = useState<TableData[] | undefined>(undefined)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [modalState, setModalState] = useState<{ [key: number]: MapType }>({})
	const [rowIndex, setRowIndex] = useState<number | undefined>(undefined)

	useEffect(() => {
		request
			.post(`/api/table/${props.fieldId}`)
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("auth-token")}`
			)
			.send({ snapshotId: router.query.snapshotId as string })
			.then((res) => {
				setData(res.body as TableData[])
			})
	}, [])

	useEffect(() => {
		if (data !== undefined) props.onChoose(data)
	}, [data])

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setModalState({})
					onClose()
					setRowIndex(undefined)
				}}
			>
				<ModalOverlay />
				<ModalContent textAlign={"left"}>
					<ModalHeader>Add {props.label}</ModalHeader>
					<ModalCloseButton />
					<ModalBody textAlign={"left"}>
						<VStack textAlign={"left"}>
							{props.fields?.map((field) => (
								<Stack key={field.id} w={"100%"}>
									<Flex align={"left"}>
										<Text textAlign={"left"}>
											{field.title}
										</Text>
									</Flex>
									<SuperInput
										key={field.id}
										type={field.type}
										value={modalState[field.id]}
										placeholder={field.title}
										onChoose={(value) => {
											setModalState({
												...modalState,
												[field.id]: value,
											})
										}}
										allowFile={field.allowFile}
										isReadonly={
											modalState[field.id]?.required
										}
										onChooseFile={(value) => {
											if (value === undefined) {
												const temp = { ...modalState }

												delete temp[field.id]

												setModalState(temp)
											} else {
												setModalState({
													...modalState,
													[field.id]: value,
												})
											}
										}}
										isRequired={field.isRequired}
									/>
								</Stack>
							))}
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="ghost"
							onClick={() => {
								setModalState({})
								onClose()
								setRowIndex(undefined)
							}}
						>
							Cancel
						</Button>
						<Button
							colorScheme="teal"
							mr={3}
							onClick={() => {
								setData((data) => {
									if (
										data === undefined ||
										rowIndex === undefined
									) {
										if (data) {
											const temp = modalState
											setModalState({})
											return [
												...data,
												mapToTabledata(
													temp,
													props.fieldId!
												),
											]
										}
										const temp = modalState
										setModalState({})
										return [
											mapToTabledata(
												temp,
												props.fieldId!
											),
										]
									}
									const temp = modalState
									setModalState({})

									return data
										.slice(0, rowIndex)
										.concat(
											[
												mapToTabledata(
													temp,
													props.fieldId!
												),
											],
											data.slice(rowIndex + 1)
										)
								})
								onClose()
								setRowIndex(undefined)
							}}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Box
				borderWidth={1}
				// borderColor={"grey"}
				width={"max-content"}
				p={2}
				rounded={"lg"}
			>
				<Table variant={"simple"}>
					{!props.isReadonly ? (
						<TableCaption textAlign={"left"}>
							<Button onClick={onOpen} colorScheme={"teal"}>
								Add Entry
							</Button>
						</TableCaption>
					) : null}
					<Thead>
						<Tr>
							{!props.isReadonly ? <Th>Delete/Edit</Th> : null}
							{props.fields?.map((field) => (
								<Th key={field.title}>{field.title}</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{data !== undefined ? (
							data?.map((row, ind) => (
								<Tr key={ind}>
									{!props.isReadonly ? (
										<Td>
											<ButtonGroup isAttached>
												{row.entries.some(
													(r) => r.required === true
												) !== true && (
													<IconButton
														aria-label="delete-row"
														onClick={() => {
															setData((data) => {
																if (
																	data?.length ===
																	1
																)
																	return []
																return data
																	?.slice(
																		0,
																		ind
																	)
																	.concat(
																		data?.slice(
																			ind +
																				1
																		)
																	)
															})
														}}
														icon={<DeleteIcon />}
													/>
												)}
												<IconButton
													aria-label="edit-row"
													onClick={() => {
														setRowIndex(ind)
														setModalState(
															tableDataToMap(row)
														)
														onOpen()
													}}
													icon={<EditIcon />}
												/>
											</ButtonGroup>
										</Td>
									) : null}
									{props.fields?.map((f) => (
										<Td key={f.id}>
											{f.type === "date"
												? row.entries.find(
														(en) =>
															en.fieldId === f.id
												  ) === undefined
													? ""
													: dayjs(
															row.entries.find(
																(en) =>
																	en.fieldId ===
																	f.id
															)?.content
													  ).format("DD-MM-YYYY")
												: row.entries.find(
														(en) =>
															en.fieldId === f.id
												  )?.content}
										</Td>
									))}
								</Tr>
							))
						) : (
							<Tr>
								<Spinner />
							</Tr>
						)}
					</Tbody>
				</Table>
			</Box>
		</>
	)
}

function RichInput(props: SuperInputProps<MapType>) {
	return <Tiptap {...props} />
}

function ReferralInput() {
	const [loading, setLoading] = useBoolean(false)
	const [email, setEmail] = useState("")
	const [abstract, setAbstract] = useState("")
	const [address, setAddress] = useState("")
	const toast = useToast()

	const onSubmit = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault()
		setLoading.on()
		try {
			const emailSchema = z.string().email()
			const check = emailSchema.safeParse(email)
			if (!check.success) {
				toast({
					title: "Check your email",
					description: "Please enter a valid email",
					status: "error",
					duration: 9000,
					isClosable: true,
				})
				setLoading.off()
				return
			}
			const res = await request
				.post(`/api/referral/create`)
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("auth-token")}`
				)
				.send({ email, abstract, address })
			if (!res.body.success) {
				throw Error(res.body.error)
			}
			toast({
				title: "Success",
				description: "Referral created",
				status: "success",
				duration: 9000,
				isClosable: true,
			})
		} catch (e) {
			console.error(e)
			toast({
				title: "Error",
				description: "Please try logging out and logging in again",
				status: "error",
				duration: 9000,
				isClosable: true,
			})
		}
		setEmail("")
		setAbstract("")
		setLoading.off()
	}

	return (
		<>
			<Popover placement="right">
				<PopoverTrigger>
					<Button>New Referral</Button>
				</PopoverTrigger>
				<Portal>
					<PopoverContent p={5}>
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								type={"email"}
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
								}}
							/>
						</FormControl>
						<FormControl isRequired my={5}>
							<FormLabel> Affiliation Address</FormLabel>
							<Textarea
								value={address}
								onChange={(e) => {
									setAddress(e.target.value)
								}}
							/>
						</FormControl>
						<Button
							type="submit"
							leftIcon={<EmailIcon />}
							colorScheme={"teal"}
							ml={"auto"}
							onClick={onSubmit}
							isLoading={loading}
						>
							Send Email Request
						</Button>
					</PopoverContent>
				</Portal>
			</Popover>
		</>
	)
}

function SuperNumberInput(props: SuperInputProps<MapType>) {
	return (
		<NumberInput
			onChoose={props.onChoose}
			value={props.value?.content}
			min={0}
			onChange={(_, val) => {
				props.onChoose({ content: val.toString(), required: false })
			}}
			isReadOnly={props.isReadonly}
			isRequired={props.isRequired}
		>
			<NumberInputField required={props.isRequired} />
			<NumberInputStepper>
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
		</NumberInput>
	)
}
