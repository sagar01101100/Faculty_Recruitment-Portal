// import {
//   Heading,
//   Center,
//   Text,
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   Input,
//   Box,
//   Image,
//   Container,
//   Flex,
//   Button,
//   useToast,
//   Link,
// } from "@chakra-ui/react"
// import { useRouter } from "next/router"
// import { useState, useCallback } from "react"
// import ReCAPTCHA from "react-google-recaptcha"
// import request, { ResponseError } from "superagent"

// export default function Signup() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [passwordError, setPasswordError] = useState("")
//   const [passwordConfirm, setPasswordConfirm] = useState("")
//   const [captchaToken, setCaptchaToken] = useState<string | null>(null)
//   const toast = useToast()
//   const router = useRouter()

//   const validatePassword = useCallback((pass: string) => {
//     if (pass.length < 8 || pass.length > 20) {
//       return "Password must be between 8 and 20 characters long."
//     }
//     if (!/[a-z]/.test(pass)) {
//       return "Password must contain at least one lowercase letter."
//     }
//     if (!/[A-Z]/.test(pass)) {
//       return "Password must contain at least one uppercase letter."
//     }
//     if (!/\d/.test(pass)) {
//       return "Password must contain at least one digit."
//     }
//     return ""
//   }, [])

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value
//     setPassword(newPassword)
//     setPasswordError(validatePassword(newPassword))
//   }

//   // Captcha Validation function 
//   function onCaptchaChange(value: string | null) {
//     console.log("Captcha value:", value)
//     setCaptchaToken(value)
//   }

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const passwordValidationError = validatePassword(password)
//     if (passwordValidationError) {
//       toast({
//         title: "Invalid Password",
//         description: passwordValidationError,
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       })
//       return
//     }

//     if (password !== passwordConfirm) {
//       toast({
//         title: "Passwords do not match",
//         description: "Please try again",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       })
//       return
//     }

//     if (!captchaToken) {
//       toast({
//         title: "Captcha Required",
//         description: "Please complete the captcha before signing up.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       })
//       return
//     }

//     try {
//       const res = await request
//         .post("/api/signup")
//         .send({ name, email, password, captchaToken })
//       localStorage.setItem("auth-token", res.body.token as string)
//       router.replace("/home")
//     } catch (e) {
//       const error = (e as ResponseError).response?.body
//       console.log(error)
//       toast({
//         title: "Signup failed",
//         description: error !== null && error.error !== null ? error.error : "Please try again",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       })
//     }
//   }

//   return (
//     <Flex
//       width="full"
//       justifyContent="center"
//       minHeight="100vh"
//       style={{
//         backgroundImage: `url('/IITPADMIN.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <Flex
//         direction="column"
//         align="center"
//         maxWidth="450px"
//         width="100%"
//         p={4}
//       >
//         <Box mb={8}>
//           <Link href="/" passHref>
//             <Button variant="unstyled" as="a">
//               <Image
//                 src="/logo.png"
//                 alt="IIT Patna Logo"
//                 boxSize="100px"
//                 objectFit="contain"
//               />
//             </Button>
//           </Link>
//         </Box>

//         <Box
//           p={8}
//           borderWidth={1}
//           borderRadius={8}
//           boxShadow="lg"
//           bg="gray.900"
//           opacity="0.9"
//           textColor="white"
//           width="100%"
//         >
//           <Box textAlign="center" mb={4}>
//             <Heading>Sign Up</Heading>
//           </Box>
//           <Box my={4} textAlign="left">
//             <form onSubmit={onSubmit}>
//               <FormControl isRequired>
//                 <FormLabel>Name</FormLabel>
//                 <Input
//                   type="name"
//                   placeholder="Your Name..."
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl mt={6} isRequired>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                   type="email"
//                   placeholder="test@test.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl mt={6} isRequired isInvalid={!!passwordError}>
//                 <FormLabel>Create a new Password</FormLabel>
//                 <Input
//                   type="password"
//                   placeholder="*******"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   onBlur={() => setPasswordError(validatePassword(password))}
//                 />
//                 <FormErrorMessage>{passwordError}</FormErrorMessage>
//               </FormControl>
//               <FormControl
//                 isRequired
//                 isInvalid={
//                   password !== passwordConfirm &&
//                   passwordConfirm.length > 0 &&
//                   password.length > 0
//                 }
//               >
//                 <FormLabel>Confirm Password</FormLabel>
//                 <Input
//                   type="password"
//                   placeholder="*******"
//                   value={passwordConfirm}
//                   onChange={(e) => setPasswordConfirm(e.target.value)}
//                 />
//                 <FormErrorMessage>
//                   Passwords do not match
//                 </FormErrorMessage>
//               </FormControl>

//               <Box mt={4}>
//                 <ReCAPTCHA
//                   sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//                   onChange={onCaptchaChange}
//                 />
//               </Box>

//               <Button width="full" mt={4} type="submit" colorScheme="blue">
//                 Sign Up
//               </Button>
//             </form>
//           </Box>
//           <Text mt={4} textAlign="center">
//             <Link
//               href="/"
//               color="blue.400"
//               textDecoration="underline"
//               _hover={{ color: "blue.600" }}
//             >
//               Already have an account? Login
//             </Link>
//           </Text>
//         </Box>
//       </Flex>
//     </Flex>
//   )
// }





//Naitik Captcha Code


import {
  Heading,
  Center,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Image,
  Container,
  HStack,
  Flex,
  Button,
  useToast,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons for show/hide
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import request, { ResponseError } from "superagent";

// Simple CAPTCHA generator
const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const getRandomStyle = () => {
  const angle = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees
  const fontSize = Math.random() * 20 + 20; // Random font size between 20px and 40px
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
  return {
    transform: `rotate(${angle}deg)`,
    fontSize: `${fontSize}px`,
    color: color,
    display: "inline-block",
  };
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [randomstyle, setRandomStyle] = useState();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setRandomStyle(() => getRandomStyle());
  };

  const validatePassword = useCallback((pass: string) => {
    if (pass.length < 8 || pass.length > 20) {
      return "Password must be between 8 and 20 characters long.";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(pass)) {
      return "Password must contain at least one digit.";
    }
    return "";
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      toast({
        title: "Invalid Password",
        description: passwordValidationError,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast({
        title: "Passwords do not match",
        description: "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (captchaInput !== captchaText) {
      toast({
        title: "Captcha Does Not Match",
        description: "Please enter the correct CAPTCHA value.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      refreshCaptcha();
      return;
    }

    try {
      const res = await request
        .post("/api/signup")
        .send({ name, email, password });
      localStorage.setItem("auth-token", res.body.token as string);
      router.replace("/home");
    } catch (e) {
      const error = (e as ResponseError).response?.body;
      toast({
        title: "Signup failed",
        description: error?.error || "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      width="full"
      justifyContent="center"
      minHeight="100vh"
      style={{
        backgroundImage: `url('/IITPADMIN.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
          <Box textAlign="center" mb={4}>
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  placeholder="Your Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="test@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired isInvalid={!!passwordError}>
                <FormLabel>Create a new Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    placeholder="*******"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => setPasswordError(validatePassword(password))}
                  />
                  <InputRightElement width="2rem" color="black">
                    <IconButton
                      h="2.5rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password for both fields
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      aria-label="Toggle Password Visibility"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={6}
                isRequired
                isInvalid={
                  password !== passwordConfirm &&
                  passwordConfirm.length > 0 &&
                  password.length > 0
                }
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"} // Use the same showPassword state here
                    placeholder="*******"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>
                  Passwords do not match
                </FormErrorMessage>
              </FormControl>

              {/* <Box mt={4}>
                <Box
                  display="inline-block"
                  padding="5px 20px"
                  fontSize="1.5rem"
                  letterSpacing="5px"
                  fontWeight="bold"
                  color="yellow.400"
                  textAlign="center"
                  borderRadius="8px"
                  userSelect="none"
                >
                  {captchaText}
                </Box>
                <Button
                  onClick={refreshCaptcha}
                  size="sm"
                  ml={4}
                  colorScheme="blue"
                  mt={2}
                >
                  Refresh Captcha
                </Button>
                <Input
                  placeholder="Enter Captcha Value"
                  mt={2}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </Box> */}


              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  CAPTCHA:{" "}
                  <Box as="span">
                    {captchaText.split("").map((char, index) => (
                      <Box key={index} as="span" style={randomstyle}>
                        {char}
                      </Box>
                    ))}
                  </Box>
                </Text>
                <HStack mb={2} spacing={2}>
                  <Button onClick={refreshCaptcha} size="sm" colorScheme="blue">
                    Refresh Captcha
                  </Button>
                  <Input
                    placeholder="Enter Captcha Value"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    maxWidth="200px"
                  />
                </HStack>
              </Box>


              <Button width="full" mt={4} type="submit" colorScheme="blue">
                Sign Up
              </Button>
            </form>
          </Box>
          <Text mt={4} textAlign="center">
            <Link
              href="/"
              color="blue.400"
              textDecoration="underline"
              _hover={{ color: "blue.600" }}
            >
              Already have an account? Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}


