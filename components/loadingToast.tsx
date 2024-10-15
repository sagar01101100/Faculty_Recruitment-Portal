import { Alert, Spinner, CloseButton, Text } from "@chakra-ui/react"
import React from "react"

export function LoadingToast(props: {
	onClose: () => void
	children?: React.ReactNode
}) {
	return (
		<Alert
			sx={{
				borderRadius: "md",
			}}
		>
			<Spinner
				size="sm"
				sx={{
					marginRight: "1rem",
				}}
			/>
			<Text sx={{ w: "100%" }}>{props.children}</Text>
			<CloseButton
				onClick={() => {
					props.onClose()
				}}
			/>
		</Alert>
	)
}
