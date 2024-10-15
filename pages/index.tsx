import React, { useState, useEffect } from "react";
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
  useDisclosure,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons
import { useRouter } from "next/router";
import request from "superagent";

// Simple captcha generator
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

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [lockoutMessage, setLockoutMessage] = useState(""); // New state for lockout message
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [resetEmail, setResetEmail] = useState("");
  const [resetButtonLoading, setResetButtonLoading] = useBoolean(false);
const [randomstyle,setRandomStyle]=useState();

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());

setRandomStyle(()=>getRandomStyle());
  };

  const doSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const res = await request.post("/api/login").send({ email, password });
      toast({
        title: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem("auth-token", res.body.token as string);
      router.replace("/home");
      setLockoutMessage(""); // Clear lockout message on successful login
    } catch (error) {
      const errorResponse = (error as any).response?.body;
      if (errorResponse && errorResponse.error === "Account is locked due to multiple failed login attempts. Please try again later.") {
        setLockoutMessage(errorResponse.error); // Set lockout message
      } else {
        toast({
          title: "Login Failed",
          description: "Please try again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      refreshCaptcha();
    }
  };

  const requestResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetButtonLoading.on();
    try {
      const response = await request.post("/api/forgot-password").send({
        email: resetEmail,
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Password reset link sent to your email",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as request.ResponseError).response?.body.error || "An error occurred",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setResetButtonLoading.off();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setResetEmail("");
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
                  colorScheme="green"
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
              <form onSubmit={doSubmit}>
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
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="2rem" color="black">
                      <IconButton
                        h="2.5rem"
                        size="sm"
                        paddingRight="0"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} // Change icon based on state
                        aria-label="Toggle Password Visibility"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

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

                {lockoutMessage && (
                  <Text color="red.300" textAlign="center" mb={4}>
                    {lockoutMessage}
                  </Text>
                )}

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
  );
}











