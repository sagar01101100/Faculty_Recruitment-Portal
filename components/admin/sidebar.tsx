import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { JSXElementConstructor, ReactElement } from "react"
import { HomeIcon } from "../Icons/Icons"

interface SidebarElement {
	title: string
	id: string
	link?: string
	icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined
	onClick?: () => void
}

export function Sidebar(props: {
	children: React.ReactNode
	elements: SidebarElement[]
	selected: string
}) {
	const router = useRouter()
	return (
		<Box display={"flex"} flexDir="row">
			<Box
				w={"250px"}
				p={2}
				backgroundColor="#171923"// 141414 1A202C
				height={"100vh"}
				maxH="100vh"
				display={"flex"}
				flexDir="column"
				position={"fixed"}
			>
				{props.elements.map((element) => {
					return (
						<Button
							key={element.title}
							variant="ghost"
							leftIcon={element.icon}
							textAlign="left"
							isFullWidth
							justifyContent={"flex-start"}
							color="gray.300"
							onClick={() => {
								router.push(element.link!);
							}}
						>
							{element.title}
						</Button>
					)
				})}
				<Button
					isFullWidth
					mt={"auto"}
					type="submit"
					onClick={() => {
						localStorage.removeItem("admin-token")
						router.replace("/admin")
					}}
					colorScheme={"red"}
					variant="ghost"
				>
					Logout
				</Button>
			</Box>
			<Box>{props.children}</Box>
		</Box>
	)
}
