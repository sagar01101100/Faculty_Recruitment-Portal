import {
	Heading,
	Flex,
	Button,
	Spinner,
	Box,
	Image,
	useColorModeValue,
	Badge,
	Modal,
	ButtonGroup,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Department, Position } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import Link from "next/link";
import FormWidget from "../../components/formWidget";
import request from "superagent";
import { ChevronDownIcon } from "@chakra-ui/icons";
import IdleLogoutProvider from "../../components/IdleLogoutProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const positions = await prisma.position.findMany({});
	const departments = await prisma.department.findMany({});
	return {
		props: { positions, departments },
	};
};

export default function Home(props: {
	positions: Position[];
	departments: Department[];
}) {
	const router = useRouter();
	const [referrals, setReferrals] = useState<
		| {
				email: string | null;
				submitted: boolean;
		  }[]
		| undefined
	>(undefined);
	const bgColor = useColorModeValue("gray.50", "gray.700");
	const shadowColor = useColorModeValue("lg", "none");
	const [snapshots, setSnapshots] = useState<
		{
			id: string;
			isComplete: boolean;
			department: Department;
			position: Position;
		}[]
	>([]);
	const [showNew, setShowNew] = useState(false);

	const [selectedDep, setSelectedDep] = useState<Department | undefined>(
		undefined
	);
	const [selectedPos, setSelectedPos] = useState<Position | undefined>(
		undefined
	);

	const [verified, setVerified] = useState(true);
	const snapshotLimit = 8;

	useEffect(() => {
		request
			.get("/api/referral")
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("auth-token")}`
			)
			.then((res) => {
				setReferrals(res.body);
			});
		request
			.get("/api/user?status=true")
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("auth-token")}`
			)
			.then((res) => {
				setSnapshots(res.body.snapshots);
			})
			.catch((err) => {
				if (err.status === 403) {
					setVerified(false);
				}
			});
	}, []);

	return (
		<>
			<IdleLogoutProvider />

			{!verified && (
				<Alert status="warning">
					<AlertIcon />
					<AlertTitle mr={2}>Your email has not been verified</AlertTitle>
					<AlertDescription>
						Please verify your email and reload this page
					</AlertDescription>
				</Alert>
			)}
			{verified && (
				<Modal
					isOpen={showNew}
					onClose={() => {
						setSelectedDep(undefined);
						setSelectedPos(undefined);
						setShowNew(false);
					}}
					isCentered
				>
					<ModalOverlay />
					<ModalContent maxW={"max-content"}>
						<ModalHeader>New Form</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<ButtonGroup>
								<Menu>
									<MenuButton
										as={Button}
										rightIcon={<ChevronDownIcon />}
									>
										{selectedDep === undefined
											? "Departments"
											: selectedDep.name}
									</MenuButton>
									<MenuList>
										{props.departments.map((department) => (
											<MenuItem
												key={department.id}
												onClick={() => {
													setSelectedDep(department);
												}}
											>
												{department.name}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
								<Menu>
									<MenuButton
										as={Button}
										rightIcon={<ChevronDownIcon />}
									>
										{selectedPos === undefined
											? "Positions"
											: selectedPos.name}
									</MenuButton>
									<MenuList>
										{props.positions.map((position) => (
											<MenuItem
												key={position.id}
												onClick={() => {
													setSelectedPos(position);
												}}
											>
												{position.name}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
							</ButtonGroup>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={"green"}
								isDisabled={
									selectedDep === undefined ||
									selectedPos === undefined
								}
								onClick={async () => {
									try {
										const res = await request
											.post("/api/addSnap")
											.set(
												"Authorization",
												`Bearer ${localStorage.getItem(
													"auth-token"
												)}`
											)
											.send({
												departmentID: selectedDep?.id,
												positionID: selectedPos?.id,
											});
										setShowNew(false);
										router.reload();
									} catch (e) {}
								}}
							>
								Create
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
			<Flex
				width="full"
				align="center"
				justifyContent="center"
				h={"100vh"}
				direction="column"
				style={{
					backgroundImage: `url('/IITPADMIN.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Box
        position="absolute"
        top="20px"
        left="20px"
        zIndex="1"
        p="2"
        borderRadius="md"
         >
         <Box textAlign="center" marginTop="10px">
				<Link href="/" passHref>
						<Button variant="unstyled" as="a">
							<Image
								src="/logo.png"
								alt="IIT Patna Logo"
								boxSize="80px"
								objectFit="contain"
							/>
						</Button>
					</Link>
        </Box>
    </Box>

				{/* Flex container to hold two FormWidget components in a row */}
				<Flex
  flexDirection="column"
  alignItems="center"
  maxW="1200px"
  mx="auto"
  mt={0}
  p={0}
>
  {snapshots.reduce((rows, snapshot, index) => {
    if (index % 2 === 0) rows.push([]);
    rows[rows.length - 1].push(snapshot);
    return rows;
  }, []).map((row, rowIndex) => (
    <Flex
      key={rowIndex}
      width="100%"
      justifyContent="center"
      mb={6} // Increased vertical spacing between rows
    >
      {row.map((snapshot, index) => (
        <FormWidget
          key={snapshot.id}
          name="Faculty Form"
          link={`/${snapshot.id}/form?id=1`}
          snapshot={snapshot}
          mx={3} // Increased horizontal spacing
          mb={4} // Added vertical spacing within row
          width="calc(50% - 24px)" // Adjusted width to account for increased margin
        />
      ))}
    </Flex>
  ))}
</Flex>

				{/* Displaying referrals */}
				{referrals !== undefined ? (
					referrals.map((referral) => (
						<Box
							key={referral.email}
							bg={bgColor}
							p={3}
							m={3}
							rounded="lg"
							boxShadow={shadowColor}
							mx={2} // Margin horizontal for spacing
						>
							{referral.email}
							<Badge
								ml={3}
								colorScheme={
									referral.submitted ? "teal" : "red"
								}
							>
								{referral.submitted ? "Submitted" : "Pending"}
							</Badge>
						</Box>
					))
				) : (
					<Spinner />
				)}

				{/* Button to create new application */}
				{verified && (
					<Button
					    
						mt={8}
						onClick={() => {
							setShowNew(true);
						}}
						
						colorScheme={snapshots.length >= snapshotLimit  ? "green" : "green"}
						color={snapshots.length >= snapshotLimit ? "red" : "white"}
						style={{
							opacity: snapshots.length >= snapshotLimit ? 0.75 : 1, // Set opacity to 0.6 when button is disabled
						}}
						isDisabled={snapshots.length >= snapshotLimit} // Disable button if snapshots count is 10 or more
					>
						
						{snapshots.length >= snapshotLimit
							? "Maximum Applications Reached"
							: "Create New Application"}
					</Button>
				)}

				{/* Logout button */}
				<Button
					width="200px"
					mt={8}
					type="submit"
					onClick={async () => {
						localStorage.removeItem("auth-token");
						await router.replace("/");
					}}
					colorScheme={"red"}
				>
					Logout
				</Button>
			</Flex>
		</>
	);
}



// import {
// 	Heading,
// 	Flex,
// 	Button,
// 	Spinner,
// 	Box,
// 	Image,
// 	useColorModeValue,
// 	Badge,
// 	Modal,
// 	ButtonGroup,
// 	Menu,
// 	MenuButton,
// 	MenuItem,
// 	MenuList,
// 	ModalOverlay,
// 	ModalContent,
// 	ModalHeader,
// 	ModalCloseButton,
// 	ModalBody,
// 	ModalFooter,
// 	Alert,
// 	AlertIcon,
// 	AlertTitle,
// 	AlertDescription,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { Department, Position } from "@prisma/client";
// import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
// import prisma from "../../lib/prisma";
// import Link from "next/link";
// import FormWidget from "../../components/formWidget";
// import request from "superagent";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import IdleLogoutProvider from "../../components/IdleLogoutProvider";

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const positions = await prisma.position.findMany({});
// 	const departments = await prisma.department.findMany({});
// 	return {
// 		props: { positions, departments },
// 	};
// };

// export default function Home(props: {
// 	positions: Position[];
// 	departments: Department[];
// }) {
// 	const router = useRouter();
// 	const [referrals, setReferrals] = useState<
// 		| {
// 				email: string | null;
// 				submitted: boolean;
// 		  }[]
// 		| undefined
// 	>(undefined);
// 	const bgColor = useColorModeValue("gray.50", "gray.700");
// 	const shadowColor = useColorModeValue("lg", "none");
// 	const [snapshots, setSnapshots] = useState<
// 		{
// 			id: string;
// 			isComplete: boolean;
// 			department: Department;
// 			position: Position;
// 		}[]
// 	>([]);
// 	const [showNew, setShowNew] = useState(false);
// 	const [selectedDep, setSelectedDep] = useState<Department | undefined>(
// 		undefined
// 	);
// 	const [selectedPos, setSelectedPos] = useState<Position | undefined>(
// 		undefined
// 	);

// 	const [verified, setVerified] = useState(true);

// 	useEffect(() => {
// 		request
// 			.get("/api/referral")
// 			.set(
// 				"Authorization",
// 				`Bearer ${localStorage.getItem("auth-token")}`
// 			)
// 			.then((res) => {
// 				setReferrals(res.body);
// 			});
// 		request
// 			.get("/api/user?status=true")
// 			.set(
// 				"Authorization",
// 				`Bearer ${localStorage.getItem("auth-token")}`
// 			)
// 			.then((res) => {
// 				setSnapshots(res.body.snapshots);
// 			})
// 			.catch((err) => {
// 				if (err.status === 403) {
// 					setVerified(false);
// 				}
// 			});
// 	}, []);

// 	return (
// 		<>
// 			<IdleLogoutProvider />

// 			{!verified && (
// 				<Alert status="warning">
// 					<AlertIcon />
// 					<AlertTitle mr={2}>Your email has not been verified</AlertTitle>
// 					<AlertDescription>
// 						Please verify your email and reload this page
// 					</AlertDescription>
// 				</Alert>
// 			)}
// 			{verified && (
// 				<Modal
// 					isOpen={showNew}
// 					onClose={() => {
// 						setSelectedDep(undefined);
// 						setSelectedPos(undefined);
// 						setShowNew(false);
// 					}}
// 					isCentered
// 				>
// 					<ModalOverlay />
// 					<ModalContent maxW={"max-content"}>
// 						<ModalHeader>New Form</ModalHeader>
// 						<ModalCloseButton />
// 						<ModalBody>
// 							<ButtonGroup>
// 								<Menu>
// 									<MenuButton
// 										as={Button}
// 										rightIcon={<ChevronDownIcon />}
// 									>
// 										{selectedDep === undefined
// 											? "Departments"
// 											: selectedDep.name}
// 									</MenuButton>
// 									<MenuList>
// 										{props.departments.map((department) => (
// 											<MenuItem
// 												key={department.id}
// 												onClick={() => {
// 													setSelectedDep(department);
// 												}}
// 											>
// 												{department.name}
// 											</MenuItem>
// 										))}
// 									</MenuList>
// 								</Menu>
// 								<Menu>
// 									<MenuButton
// 										as={Button}
// 										rightIcon={<ChevronDownIcon />}
// 									>
// 										{selectedPos === undefined
// 											? "Positions"
// 											: selectedPos.name}
// 									</MenuButton>
// 									<MenuList>
// 										{props.positions.map((position) => (
// 											<MenuItem
// 												key={position.id}
// 												onClick={() => {
// 													setSelectedPos(position);
// 												}}
// 											>
// 												{position.name}
// 											</MenuItem>
// 										))}
// 									</MenuList>
// 								</Menu>
// 							</ButtonGroup>
// 						</ModalBody>
// 						<ModalFooter>
// 							<Button
// 								colorScheme={"green"}
// 								isDisabled={
// 									selectedDep === undefined ||
// 									selectedPos === undefined
// 								}
// 								onClick={async () => {
// 									try {
// 										const res = await request
// 											.post("/api/addSnap")
// 											.set(
// 												"Authorization",
// 												`Bearer ${localStorage.getItem(
// 													"auth-token"
// 												)}`
// 											)
// 											.send({
// 												departmentID: selectedDep?.id,
// 												positionID: selectedPos?.id,
// 											});
// 										setShowNew(false);
// 										router.reload();
// 									} catch (e) {}
// 								}}
// 							>
// 								Create
// 							</Button>
// 						</ModalFooter>
// 					</ModalContent>
// 				</Modal>
// 			)}
// 			<Flex
// 				width="full"
// 				align="center"
// 				justifyContent="center"
// 				h={"100vh"}
// 				direction="column"
// 				style={{
// 					backgroundImage: `url('/IITPADMIN.jpg')`,
// 					backgroundSize: "cover",
// 					backgroundPosition: "center",
// 					backgroundRepeat: "no-repeat",
// 				}}
// 			>
// 				<Box
//         position="absolute"
//         top="20px"
//         left="20px"
//         zIndex="1"
//         p="2"
//         borderRadius="md"
//          >
//          <Box textAlign="center" marginTop="10px">
// 				<Link href="/" passHref>
// 						<Button variant="unstyled" as="a">
// 							<Image
// 								src="/logo.png"
// 								alt="IIT Patna Logo"
// 								boxSize="80px"
// 								objectFit="contain"
// 							/>
// 						</Button>
// 					</Link>
//         </Box>
//     </Box>

// 				{/* Flex container to hold two FormWidget components in a row */}
// 				<Flex
//   flexDirection="column"
//   alignItems="center"
//   maxW="1200px"
//   mx="auto"
//   mt={0}
//   p={0}
// >
//   {snapshots.reduce((rows, snapshot, index) => {
//     if (index % 2 === 0) rows.push([]);
//     rows[rows.length - 1].push(snapshot);
//     return rows;
//   }, []).map((row, rowIndex) => (
//     <Flex
//       key={rowIndex}
//       width="100%"
//       justifyContent="center"
//       mb={6} // Increased vertical spacing between rows
//     >
//       {row.map((snapshot, index) => (
//         <FormWidget
//           key={snapshot.id}
//           name="Faculty Form"
//           link={`/${snapshot.id}/form?id=1`}
//           snapshot={snapshot}
//           mx={3} // Increased horizontal spacing
//           mb={4} // Added vertical spacing within row
//           width="calc(50% - 24px)" // Adjusted width to account for increased margin
//         />
//       ))}
//     </Flex>
//   ))}
// </Flex>

// 				{/* Displaying referrals */}
// 				{referrals !== undefined ? (
// 					referrals.map((referral) => (
// 						<Box
// 							key={referral.email}
// 							bg={bgColor}
// 							p={3}
// 							m={3}
// 							rounded="lg"
// 							boxShadow={shadowColor}
// 							mx={2} // Margin horizontal for spacing
// 						>
// 							{referral.email}
// 							<Badge
// 								ml={3}
// 								colorScheme={
// 									referral.submitted ? "teal" : "red"
// 								}
// 							>
// 								{referral.submitted ? "Submitted" : "Pending"}
// 							</Badge>
// 						</Box>
// 					))
// 				) : (
// 					<Spinner />
// 				)}

// 				{/* Button to create new application */}
// 				{verified && (
// 					<Button
// 						mt={8}
// 						onClick={() => {
// 							setShowNew(true);
// 						}}
// 						colorScheme={"green"}
// 					>
// 						Create new Application
// 					</Button>
// 				)}

// 				{/* Logout button */}
// 				<Button
// 					width="200px"
// 					mt={8}
// 					type="submit"
// 					onClick={async () => {
// 						localStorage.removeItem("auth-token");
// 						await router.replace("/");
// 					}}
// 					colorScheme={"red"}
// 				>
// 					Logout
// 				</Button>
// 			</Flex>
// 		</>
// 	);
// }