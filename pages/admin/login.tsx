import {
	Heading,
	Center,
	Text,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Box,
	Container,
	Flex,
	Button,
	useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import request from "superagent"
import { useRouter } from "next/router"
import ReCAPTCHA from "react-google-recaptcha"

export default function Login() {

	const toast = useToast()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [token, setToken] = useState<string | null>(null)
	const router = useRouter()

	

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
         
		try {
			const res = await request
				.post("/api/admin/login")
				.send({ email: email, password: password })
			toast({
				title: "Login Success",
				// description: res.body.token as string,
			})

			localStorage.setItem("admin-token", res.body.token as string)
			router.replace("/admin/home")
		} catch (e: any) {
			toast({
				title: "Login failed",
				description: "Please try again",
				status: "error",
				duration: 9000,
				isClosable: true,
			})
		}
	}

	return (
		<Flex width="full" align="center" justifyContent="center" h={"100vh"}>
			<Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
				<Box textAlign="center">
					<Heading>Log In</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={onSubmit}>
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								placeholder="test@test.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl mt={6} isRequired>
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								placeholder="*******"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>

						<Button width="full" mt={4} type="submit">
							Login
						</Button>
					</form>
				</Box>
			</Box>
		</Flex>
	)
}
