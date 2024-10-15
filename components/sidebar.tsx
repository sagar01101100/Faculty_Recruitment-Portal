
//sidebar.tsx
import {
	Box,
	Button,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerContent,
	VStack,
	HStack,
	Text,
	useColorModeValue,
	Heading,
	Spinner,
	useBoolean,
	IconButton,
	Flex,
	Image,
	Spacer,
	CircularProgress,
	Progress,
	Stack,
	propNames,
} from "@chakra-ui/react"
import { MouseEventHandler, useEffect, useState } from "react"
import { TableData, TableSchema } from "./superInput/types"
import { Field, FieldGroup } from "@prisma/client"
import { SuperFormData } from "../lib/formEntries"
import Link from "next/link"
import theme from "../lib/theme"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

interface Props {
	variant: string
	fieldGroups: {
		id: number
		title: string
		description: string | null
		fields: Field[]
	}[]
	onClick: () => void
	currentGroup?: number
	fields: (Field & {
		fields: Field[]
	})[]
	fieldGroupProgress?: {
		fieldGroup: FieldGroup
		progress: number
	}[]
	progress: { fieldGroupId: number; progress: number }[] | undefined
	downloading: boolean
	onSubmit: () => void
}
//const SidebarContent = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => (

const SidebarContent = ({
	onClick,
	fieldGroups,
	currentGroup,
	fields,
	fieldGroupProgress,
	progress,
	onSubmit,
	downloading
}: Props) => {
	const router = useRouter()
	const { snapshotId } = router.query
	const { id } = router.query
	const [clickedId, setClickedId] = useState<number | undefined>(undefined)

	useEffect(() => {
		if (
			!Array.isArray(id) &&
			id !== undefined &&
			parseInt(id) === clickedId
		) {
			setClickedId(undefined)
		}
	}, [id, clickedId])

	return (
		<Flex align={"flex-start"} direction={"column"} height={"100%"}>
			{fieldGroups.map((fieldGroup) => (
				<Link
					href={`/${router.query.snapshotId}/form?id=${fieldGroup.id}`}
					passHref
					key={fieldGroup.id}
				>
					<Button
						variant={
							currentGroup === fieldGroup.id ? "solid" : "outline"
						}
						my={2}
						h={"max-content"}
						w={"100%"}
						isLoading={
							clickedId !== undefined &&
							clickedId === fieldGroup.id
						}
						onClick={() => {
							setClickedId(fieldGroup.id)
							onClick()
						}}
					// colorScheme={"teal"}
					>
						<Stack p={2} w={"100%"}>
							<Text align={"left"}>{fieldGroup.title}</Text>
							<Progress
								value={Math.floor(
									((progress?.filter(
										(p) => p.fieldGroupId === fieldGroup.id
									)[0]?.progress ?? 0) *
										100) /
									(fieldGroup.fields.filter(
										(f) => f.isRequired
									).length === 0
										? 1
										: fieldGroup.fields.filter(
											(f) => f.isRequired
										).length)
								)}
								isIndeterminate={progress === undefined}
								mb={5}
								size={"sm"}
								colorScheme={"green"}
								rounded={"md"}
							/>
						</Stack>
					</Button>
				</Link>
			))}
			<Spacer />


			<VStack width="100%" spacing={2}>
				<HStack width="100%">
					<Link href={`/home`} passHref>
						<Button variant="solid" colorScheme={"red"}>
							Exit form
						</Button>
					</Link>
					<Spacer />
					<Button
						colorScheme={"green"}
						isLoading={downloading}
						onClick={(e) => {
							onSubmit()
						}}
					>
						Submit Form
					</Button>
				</HStack>
				<Link href={`/${snapshotId}/preview?id=1`} passHref>
					<Button width="100%" colorScheme={"blue"}>
						Preview
					</Button>
				</Link>
			</VStack>
		</Flex>
	)
}

const Sidebar = ({
	variant,
	fieldGroups,
	currentGroup,
	fields,
	progress,
	onSubmit,
	downloading
}: Props) => {
	const bg = useColorModeValue("gray.100", "gray.700")
	const [fggp, setFggp] = useState<
		| {
			fieldGroup: FieldGroup
			progress: number
		}[]
		| undefined
	>(undefined)
	const [isOpen, setOpen] = useBoolean(true)

	// create useEffect here which will load progress using fields
	// useEffect(() => {
	//
	// 	// let fieldGroupProgress: {
	// 	// 	fieldGroup: FieldGroup
	// 	// 	progress: number
	// 	// }[] = []
	// 	// for (let fg of fieldGroups) {
	// 	// 	let currentFieldGroupProgress: number = 0
	// 	// 	for (let fld of fg.fields) {
	// 	// 		// if (fg.fields.some((field) => field.id == (fld as Field).id)) {
	// 	// 		// 	currentFieldGroupProgress++
	// 	// 		// }
	// 	// 			currentFieldGroupProgress++
	// 	// 		// if (fg.fields.some((field) => data[field.id] !== undefined)) {
	// 	// 		// 	currentFieldGroupProgress++
	// 	// 		// }
	// 	// 	}
	// 	// 	fieldGroupProgress.push({
	// 	// 		fieldGroup: fg,
	// 	// 		progress: currentFieldGroupProgress,
	// 	// 	})
	// 	// }
	// 	// setFggp(fieldGroupProgress)
	// }, [progress])

	return variant === "sidebar" ? (
		//paddingBottom to move up the buttons
		<Box p={10} w="max-content" top={0} h="100vh" bg={bg} paddingBottom="120px">
			<Box marginLeft="10px" top={5} paddingBottom="10px">
				<Link href="/home" passHref>
					<Button variant="unstyled" as="a">
						<Image
							src="/logo.png"
							alt="IIT Patna Logo"
							boxSize="60px"
							objectFit="contain"
							marginLeft="85px"
						/>
					</Button>
				</Link>
				<Text>IIT Patna Faculty Recruitment Portal</Text>
				<Text></Text>

			</Box>
			<SidebarContent
				variant={variant}
				onClick={() => { }}
				fieldGroups={fieldGroups}
				currentGroup={currentGroup}
				fields={fields}
				fieldGroupProgress={fggp}
				progress={progress}
				onSubmit={onSubmit}
				downloading={downloading}
			/>
		</Box>
	) : (
		<>
			<Button
				rightIcon={<ChevronRightIcon />}
				onClick={() => {
					setOpen.on()
				}}
				m={5}
				width="max-content"
				minW="max-content"
			>
				Sections
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={() => {
					setOpen.off()
				}}
			>
				<DrawerOverlay h={"100vh"}>
					<DrawerContent h={"100vh"}>
						<DrawerCloseButton />
						<DrawerHeader>Form Sections</DrawerHeader>
						<DrawerBody>
							<SidebarContent
								variant={variant}
								onClick={() => {
									console.log("form is sumitted!")
									setOpen.off()
								}}
								fieldGroups={fieldGroups}
								currentGroup={currentGroup}
								fields={fields}
								fieldGroupProgress={fggp}
								progress={progress}
								onSubmit={onSubmit}
								downloading={downloading}
							/>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}

export default Sidebar
