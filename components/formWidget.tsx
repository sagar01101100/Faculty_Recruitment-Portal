import {
	Heading,
	Text,
	Box,
	Flex,
	Button,
	Badge,
	useDisclosure,
	ButtonGroup,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useToast
} from "@chakra-ui/react"
import React, { useState } from "react"
import request from "superagent"
import { BsDownload } from "react-icons/bs"
import { Department, Position } from "@prisma/client"
import { useAtom } from "jotai"
import { snapshotAtom } from "../atoms/snapshot"
import { useRouter } from "next/router"

interface FormWidgetProps {
	name: string
	link: string
	snapshot: {
		id: string
		isComplete: boolean
		department: Department
		position: Position
	}
}

export default function FormWidget(props: FormWidgetProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [, setSnapshot] = useAtom(snapshotAtom)
	const router = useRouter()
	const cancelRef = React.useRef<HTMLButtonElement>(null)
	const [downloadLoading, setDownloadLoading] = useState(false)
	const toast = useToast()

	const onDelete = async () => {
		try {
			await request
				.post("/api/save?reset=true")
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("auth-token")}`
				)
				.send({ snapshotId: props.snapshot.id })
			onClose()
			router.reload()
		} catch (error) {
			console.error("Error deleting form:", error)
			// You might want to show an error message to the user here
		}
	}

	const handleDownload = async () => {
		try {
			setDownloadLoading(true)
			const res = await request
				.post("/api/preview")
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("auth-token")}`
				)
				.send({
					snapshotId: props.snapshot.id,
				})
				.responseType("blob")

			if (res.statusCode >= 300) {
				throw new Error("Failed to generate form")
			}

			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(res.body)
			} else {
				const objUrl = window.URL.createObjectURL(res.body)
				const link = document.createElement("a")
				link.href = objUrl
				link.download = "final.pdf"
				link.click()
				setTimeout(() => {
					window.URL.revokeObjectURL(objUrl)
				}, 250)
			}
			setDownloadLoading(false)
		} catch (error) {
			console.error("Error downloading form:", error)
			toast({
				title: "Error downloading pdf",
				description: error,
				status: "error",
				duration: 9000,
				isClosable: true,
			})
			// You might want to show an error message to the user here
			setDownloadLoading(false)
		}
	}

	return (
		<>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Application
						</AlertDialogHeader>

						<AlertDialogBody fontWeight="bold">
							Are you sure you want to delete this application? This action cannot be undone.
							All saved data in this form will be permanently deleted.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={onDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>

			<Flex
				width="full"
				align="center"
				justifyContent="center"
				mb={0}
			>
				<Box
					p={1}
					borderWidth={1}
					borderRadius={8}
					boxShadow="lg"
					backgroundColor="gray.900"
					width="400px"
					opacity={0.75}
					height="120px"
					marginLeft="10px"
					marginRight="10px"
				>
					<Box textAlign="center" mb={3} textColor="white">
						<Heading size="sm">Form for {props.snapshot.position.name}</Heading>
						<Text fontSize="sm">Department of {props.snapshot.department.name}</Text>
					</Box>
					{props.snapshot.isComplete ? (
						<>
							<Badge colorScheme="green">Completed</Badge>
							<Button
								mt={3}
								leftIcon={<BsDownload />}
								onClick={handleDownload}
								isLoading={downloadLoading}
							>
								Download Form
							</Button>
						</>
					) : (
						<ButtonGroup>
							<Button
								colorScheme="teal"
								size="sm"
								isLoading={props.snapshot.isComplete === undefined}
								onClick={() => {
									setSnapshot(props.snapshot.id)
									router.push(props.link)
								}}
							>
								Open
							</Button>
							<Button
								size="sl"
								onClick={onOpen}
								colorScheme="red"
								variant="ghost"
							>
								Delete Form
							</Button>
						</ButtonGroup>
					)}
				</Box>
			</Flex>
		</>
	)
}