import {
	Button,
	Box,
	ThemeProvider,
	extendTheme,
	Table,
	TableCaption,
	CSSReset,
	Tbody,
	Thead,
	Tr,
	Th,
	Td,
	Tfoot,
	ThemeDirection,
	Spinner,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	toast,
	useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import {
	BsBarChartLine,
	BsBarChartLineFill,
	BsFolderSymlinkFill,
	BsUiChecks,
} from "react-icons/bs"
import { FieldGroup } from "@prisma/client"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import prisma from "../../lib/prisma"
import Link from "next/link"
import FormWidget from "../../components/formWidget"
import request from "superagent"
import { Card } from "../../components/card"
import { Sidebar } from "../../components/admin/sidebar"
import { HomeIcon } from "../../components/Icons/Icons"

export const getServerSideProps: GetServerSideProps = async (context) => {
	const admins = await prisma.admin.findMany({
		orderBy: {
			id: "asc",
		},
		select: {
			id: true,
			name: true,
			email: true,
		},
	})

	return {
		props: {
			admins: admins,
		},
	}
}

export default function Admin(props: {
	admins: {
		id: string
		name: string
		email: string
	}[]
}) {
	const toast = useToast()
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const res = await request
				.post("/api/admin/admin")
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("admin-token")}`
				)
				.send({ name: name, email: email, password: password })
			await router.replace(router.asPath)
			toast({
				title: "Addition Successful",
				description: "Read Title",
				variant: "success",
				duration: 3000,
			})
			// setTimeout(() => {
			// 	refreshPage()
			// }, 3000)
		} catch (e: any) {
			toast({
				title: "Addition failed",
				description: "Please try again",
				status: "error",
				duration: 9000,
				isClosable: true,
			})
		}
	}
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Box
				m={10}
				border="1px solid"
				borderColor="gray.600"
				borderRadius="md"
				padding={5}
			>
				<Table variant="striped">
					<Thead>
						<Tr>
							<Th>User id</Th>
							<Th>Name</Th>
							<Th>Email</Th>
						</Tr>
					</Thead>
					<Tbody>
						{props.admins !== undefined ? (
							props.admins.map((row, ind) => (
								<Tr key={ind}>
									<Td>{row.id}</Td>
									<Td>{row.name}</Td>
									<Td>{row.email}</Td>
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
			<Button onClick={onOpen} mt={0} ml={10}>
				Add Administrator
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Adding Administrator...</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={onSubmit}>
						<ModalBody>
							<Box my={4} textAlign="left">
								<FormControl isRequired>
									<FormLabel>Name</FormLabel>
									<Input
										type="name"
										placeholder="Name..."
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</FormControl>
								<FormControl mt={6} isRequired>
									<FormLabel>Email</FormLabel>
									<Input
										type="email"
										placeholder="test@test.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</FormControl>
								<FormControl mt={6} isRequired>
									<FormLabel>Password</FormLabel>
									<Input
										type="password"
										placeholder="*******"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</FormControl>
							</Box>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								type="submit"
								onClick={() => {
									onClose()
								}}
							>
								Add admin
							</Button>
							<Button variant="ghost">Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
