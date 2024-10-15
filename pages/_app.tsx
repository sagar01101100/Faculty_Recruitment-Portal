import type { AppProps } from "next/app"
import { useHydrateAtoms } from "jotai/utils"

import { ChakraProvider, extendTheme, ThemeProvider } from "@chakra-ui/react"

import "../style.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { Sidebar } from "../components/admin/sidebar"
import {
	BsUiChecks,
	BsBarChartLineFill,
	BsPersonCheckFill,
} from "react-icons/bs"
import { HomeIcon } from "../components/Icons/Icons"
import { useRouter } from "next/router"
import { snapshotAtom } from "../atoms/snapshot"

const queryClient = new QueryClient()
const theme = extendTheme({
	styles: {
		global: (props: any) => ({
			"html, body": {
				bg: props.colorMode === "dark" ? "#141414" : "white",
				color: props.colorMode === "dark" ? "gray.300" : "black",
			},
		}),
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const isAdmin =
		router.pathname.includes("admin") && !router.pathname.includes("login")

	return (
		<ChakraProvider theme={isAdmin ? theme : undefined}>
			<QueryClientProvider client={queryClient}>
				{isAdmin ? (
					<Sidebar
						selected="home"
						elements={[
							{
								title: "Home",
								id: "home",
								link: "/admin/home",
								icon: <HomeIcon />,
							},
							{
								title: "Form",
								id: "form",
								link: "/admin/form",
								icon: <BsUiChecks />,
							},
							{
								title: "Submissions",
								id: "entries",
								link: "/admin/submissions",
								icon: <BsBarChartLineFill />,
							},
							{
								title: "Admin",
								id: "admin",
								link: "/admin/admins",
								icon: <BsPersonCheckFill />,
							},
						]}
					>
						<div style={{
							marginLeft: "250px",
						}}>
							<Component {...pageProps} />
						</div>
					</Sidebar>
				) : (
					<Component {...pageProps} />
				)}
			</QueryClientProvider>
		</ChakraProvider>
	)
}

export default MyApp
