import prisma from "../../lib/prisma"
import { GetServerSideProps } from "next"
import dayjs from "dayjs"
import { useEffect } from "react"
import { Box, Button, Center, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query
	if (!Array.isArray(id)) {
		const req = await prisma.verificationRequest.findUnique({
			where: { id: id },
		})
		console.log(dayjs().diff(dayjs(req!.createdAt), "days"))
		
		if (dayjs().diff(dayjs(req!.createdAt), "days") > 1) {
			await prisma.user.delete({
				where: { id: req!.userId },
			})
			await prisma.verificationRequest.delete({
				where: { id: req!.id },
			})
			return {
				props: {
					verified: false,
				},
			}
		}

		await prisma.verificationRequest.update({
			where: { id: id },
			data: {
				isVerified: true,
			},
		})
		await prisma.user.update({
			where: { id: req!.userId },
			data: {
				verified: true
			},
		})
		

		return {
			props: {
				verified: true,
			},
		}
	}
	return {
		props: {},
		redirect: {
			destination: "/",
			permanent: false,
		},
	}
}

export default function Verify(props: { verified: boolean }) {
	const router = useRouter()
	return (
		<>
			<Center
				sx={{
					height: "100vh",
				}}
			>
				<VStack>
					<Box>
						{props.verified
							? "Verified, Please login to continue"
							: "Link Expired. Please Signup again"}
					</Box>
					<Button
						onClick={() => {
							router.replace(props.verified ? "/login" : "/signup")
						}}
					>
						{props.verified ? "Login" : "Signup"}
					</Button>
				</VStack>
			</Center>
		</>
	)
}
