import {
	Box,
	Button,
	Center,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { ReferralField, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import request from "superagent"
import { Card } from "../../components/card"
import { SuperInput } from "../../components/superInput"
import { SuperInputForm } from "../../components/superInputForm"
import Tiptap from "../../components/Tiptap"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.query.id as string
	const referral = await prisma.referral.findUnique({
		where: {
			id: id,
		},
		select: {
			user: true,
			submitted: true,
		},
	})
	if (!referral || referral.submitted) {
		console.log("referral not found")
		return {
			redirect: {
				status: 404,
				destination: "/404",
				permanent: false,
			},
			props: {},
		}
	}
	const fields = await prisma.referralField.findMany({
		orderBy: {
			id: "asc",
		},
	})
	return {
		props: {
			user: referral?.user,
			fields,
			referralId: id,
		},
	}
}

export default function ReferralForm(props: {
	user: User
	fields: ReferralField[]
	referralId: string
}) {
	const toast = useToast()
	return (
		<>
			<Head>
				<title>Referral for {props.user.name} | IIT Patna</title>
			</Head>
			<Box py={10} minH="100vh" px={{ base: "4", lg: "8" }}>
				<Box mx="auto" maxW="5xl">
					<Heading
						textAlign="center"
						size="xl"
						fontWeight="extrabold"
						mb={10}
					>
						Referral for {props.user.name}
					</Heading>
					<Card>
						<SuperInputForm
							fields={props.fields}
							onSave={async (data) => {
								var res = await request
									.post("/api/referral/submit")
									.send({
										entries: data.entries,
										referralId: props.referralId,
									})
								if (res.statusCode >= 300) {
									toast({
										title: "Error",
										description: res.body.error,
										status: "error",
										duration: 9000,
									})
								} else {
									alert("Referral submitted successfully! You may now close this tab.")
								}
							}}
							showSidebar={false}
							isReferral
						/>
					</Card>
				</Box>
			</Box>
		</>
	)
}
