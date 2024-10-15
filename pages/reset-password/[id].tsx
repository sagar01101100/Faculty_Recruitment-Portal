// import {
// 	Button,
// 	Center,
// 	FormControl,
// 	FormErrorMessage,
// 	FormLabel,
// 	Heading,
// 	Input,
// 	useToast,
// 	VStack,
// } from "@chakra-ui/react"
// import { GetServerSideProps } from "next"
// import { useRouter } from "next/router"
// import { FormEvent, useState } from "react"
// import { isError } from "react-query"
// import request from "superagent"
// import prisma from "../../lib/prisma"

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const { id } = context.query

// 	const resetRequest = await prisma.passwordResetRequest.findUnique({
// 		where: { id: id as string },
// 		select: {
// 			isReset: true,
// 			createdAt: true,
// 		},
// 	})

// 	if (
// 		!resetRequest ||
// 		resetRequest.isReset ||
// 		Date.now() - Date.parse(resetRequest!.createdAt.toISOString()) >
// 			1000 * 60 * 60 * 24
// 	) {
// 		return {
// 			props: {},
// 			redirect: {
// 				destination: "/404",
// 				permanent: false,
// 			},
// 		}
// 	}
// 	return {
// 		props: {},
// 	}
// }

// export default function ResetPassword() {
// 	const [password, setPassword] = useState("")
// 	const [passwordConfirm, setPasswordConfirm] = useState("")
// 	const router = useRouter()
// 	const toast = useToast()

// 	const error = passwordConfirm !== password && passwordConfirm !== ""

// 	const onSubmit = async (e: FormEvent) => {
// 		e.preventDefault()

// 		var res = await request.post("/api/forgot-password?reset=true").send({
// 			password,
// 			requestId: router.query.id as string,
// 		})

// 		if (res.statusCode !== 200) {
// 			toast({
// 				title: "Error",
// 				description: res.body.error,
// 				status: "error",
// 				duration: 9000,
// 				isClosable: true,
// 			})
// 			return
// 		} else {
// 			toast({
// 				title: "Sucess",
// 				description: "Password sucessfully reset!",
// 				status: "success",
// 				duration: 9000,
// 				isClosable: true,
// 			})
// 			setTimeout(() => {
// 				router.replace("/")
// 			}, 2000)
// 		}
// 	}

// 	return (
// 		<>
// 			<Center height={"100vh"}>
// 				<form onSubmit={onSubmit}>
// 					<VStack spacing={4}>
// 						<Heading>Reset Password</Heading>
// 						<FormControl isRequired>
// 							<FormLabel htmlFor="password">
// 								New Password
// 							</FormLabel>
// 							<Input
// 								id="password"
// 								placeholder=""
// 								value={password}
// 								type="password"
// 								onChange={(e) => setPassword(e.target.value)}
// 							/>
// 						</FormControl>
// 						<FormControl isInvalid={error} isRequired>
// 							<FormLabel htmlFor="confirm-password">
// 								Confirm New Password
// 							</FormLabel>
// 							<Input
// 								id="confirm-password"
// 								placeholder=""
// 								value={passwordConfirm}
// 								type="password"
// 								onChange={(e) =>
// 									setPasswordConfirm(e.target.value)
// 								}
// 							/>
// 							{error && (
// 								<FormErrorMessage>
// 									Both passwords must match
// 								</FormErrorMessage>
// 							)}
// 						</FormControl>
// 						<Button
// 							disabled={
// 								error ||
// 								password === "" ||
// 								passwordConfirm === ""
// 							}
// 							type="submit"
// 						>
// 							Change Password
// 						</Button>
// 					</VStack>
// 				</form>
// 			</Center>
// 		</>
// 	)
// }



import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import request from "superagent"
import prisma from "../../lib/prisma"
import { error } from "console"

// ... getServerSideProps remains unchanged ...

const validatePassword = (password: string) => {
  const errors = [];
  if (password.length < 8 || password.length > 20) {
    errors.push("Password must be between 8 and 20 characters long");
  }
  else if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  else if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  else if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit");
  }
  else return errors;
  return errors;
}

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const router = useRouter()
  const toast = useToast()

  const matchError = passwordConfirm !== password && passwordConfirm !== ""

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const errors = validatePassword(password);
    setPasswordErrors(errors);

    if (errors.length > 0 || matchError) {
      return;
    }

    var res = await request.post("/api/forgot-password?reset=true").send({
      password,
      requestId: router.query.id as string,
    })

    if (res.statusCode !== 200) {
      toast({
        title: "Error",
        description: res.body.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Success",
        description: "Password successfully reset!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        router.replace("/")
      }, 2000)
    }
  }

  return (
    <>
      <Center height={"100vh"}>
        <form onSubmit={onSubmit}>
          <VStack spacing={4} width="300px">
            <Heading>Reset Password</Heading>
            <FormControl isRequired isInvalid={passwordErrors.length > 0}>
              <FormLabel htmlFor="password">
                New Password
              </FormLabel>
              <Input
                id="password"
                placeholder=""
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordErrors(validatePassword(e.target.value))
                }}
              />
              {passwordErrors.length > 0 && (
                <FormErrorMessage>
                  {passwordErrors.map((error, index) => (
                    <Text key={index}>{error}</Text>
                  ))}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={matchError} isRequired>
              <FormLabel htmlFor="confirm-password">
                Confirm New Password
              </FormLabel>
              <Input
                id="confirm-password"
                placeholder=""
                value={passwordConfirm}
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {matchError && (
                <FormErrorMessage>
                  Both passwords must match
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              disabled={
                matchError ||
                password === "" ||
                passwordConfirm === "" ||
                passwordErrors.length > 0
              }
              type="submit"
              width="100%"
            >
              Change Password
            </Button>
          </VStack>
        </form>
      </Center>
    </>
  )
}