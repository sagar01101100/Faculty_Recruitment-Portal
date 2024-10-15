import React from "react"
import { Flex, FlexProps } from "@chakra-ui/react"

export default function IconBox(props: FlexProps) {
	const { children, ...rest } = props
	return (
		<Flex
			alignItems={"center"}
			justifyContent={"center"}
			borderRadius={"12px"}
			{...rest}
		>
			{children}
		</Flex>
	)
}
