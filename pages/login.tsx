import {
	Heading,
	FormControl,
	FormLabel,
	Input,
	Box,
	Link,
	Image,
	Flex,
	Button,
	useToast,
	Text,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
	useBoolean,
	useDisclosure
  } from "@chakra-ui/react"
  import { useRouter } from "next/router"
  import { useState } from "react"
  import ReCAPTCHA from "react-google-recaptcha"
  import request from "superagent"
  
  export default function Login() {
	const toast = useToast()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [captchaToken, setCaptchaToken] = useState<string | null>(null)
	const router = useRouter()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [resetEmail, setResetEmail] = useState("")
	const [resetButtonLoading, setresetButtonLoading] = useBoolean(false)
  
	function onCaptchaChange(value: string | null) {
	  console.log("Captcha value:", value)
	  setCaptchaToken(value)
	}
  
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	  e.preventDefault()
  
	  if (!captchaToken) {
		toast({
		  title: "Captcha Required",
		  description: "Please complete the captcha before logging in.",
		  status: "error",
		  duration: 3000,
		  isClosable: true,
		})
		return
	  }
  
	  try {
		const res = await request
		  .post("/api/login")
		  .send({ email, password, captchaToken })
		toast({
		  title: "Login Success",
		  status: "success",
		  duration: 3000,
		  isClosable: true,
		})
  
		localStorage.setItem("auth-token", res.body.token as string)
		router.replace("/home")
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
  
	const requestResetPassword = async (e: React.FormEvent) => {
	  e.preventDefault()
	  setresetButtonLoading.on()
	  try {
		const response = await request.post("/api/forgot-password").send({
		  email: resetEmail,
		})
		if (response.status === 200) {
		  toast({
			title: "Success",
			description: "Password reset link sent to your email",
			status: "success",
			duration: 9000,
			isClosable: true,
		  })
		  onClose()
		}
	  } catch (e) {
		toast({
		  title: "Error",
		  description: (e as request.ResponseError).response?.body.error,
		  status: "error",
		  duration: 9000,
		  isClosable: true,
		})
	  } finally {
		setresetButtonLoading.off()
	  }
	}
  
	return (
	  <>
		<Modal
		  isOpen={isOpen}
		  onClose={() => {
			onClose()
			setResetEmail("")
		  }}
		  isCentered
		>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader>Enter Email to get reset link</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
			  <form onSubmit={requestResetPassword}>
				<VStack spacing={4}>
				  <FormControl>
					<FormLabel htmlFor="resetEmail">Email</FormLabel>
					<Input
					  isRequired
					  id="resetEmail"
					  type="email"
					  placeholder="Email"
					  value={resetEmail}
					  onChange={(e) => setResetEmail(e.target.value)}
					/>
				  </FormControl>
				  <Button
					colorScheme={"green"}
					isLoading={resetButtonLoading}
					type="submit"
				  >
					Request Reset
				  </Button>
				</VStack>
			  </form>
			</ModalBody>
		  </ModalContent>
		</Modal>
  
		<Flex
		  width="full"
		  justifyContent="center"
		  minHeight="100vh"
		  style={{
			backgroundImage: `url('/IITPADMIN.jpg')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
		  }}
		>
		  <Flex
			direction="column"
			align="center"
			maxWidth="450px"
			width="100%"
			p={4}
		  >
			<Box mb={8}>
			  <Link href="/" passHref>
				<Button variant="unstyled" as="a">
				  <Image
					src="/logo.png"
					alt="IIT Patna Logo"
					boxSize="100px"
					objectFit="contain"
				  />
				</Button>
			  </Link>
			</Box>
  
			<Box
			  p={8}
			  borderWidth={1}
			  borderRadius={8}
			  boxShadow="lg"
			  bg="gray.900"
			  opacity="0.9"
			  textColor="white"
			  width="100%"
			>
			  <Box textAlign="center" textColor="white">
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
  
				  <Box mt={4}>
					<ReCAPTCHA
					  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
					  onChange={onCaptchaChange}
					/>
				  </Box>
  
				  <Button width="full" mt={4} type="submit" colorScheme="blue">
					Login
				  </Button>
				</form>
  
				<Text mt={2} textAlign="center">
				  <Link
					color="blue.400"
					onClick={onOpen}
					textDecoration="underline"
					_hover={{ color: "blue.600" }}
				  >
					Forgot Password?
				  </Link>
				</Text>
  
				<Text mt={2} textAlign="center">
				  <Link
					color="blue.400"
					href="/signup"
					textDecoration="underline"
					_hover={{ color: "blue.600" }}
				  >
					Don't have an Account? Sign Up
				  </Link>
				</Text>
			  </Box>
			</Box>
		  </Flex>
		</Flex>
	  </>
	)
  }
  