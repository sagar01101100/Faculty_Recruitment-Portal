import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

export const Card = (props: BoxProps) => (
	<Box
		bg={useColorModeValue("white", "gray.700")}
		py="8"
		px={{ base: "4", md: "10" }}
		shadow={useColorModeValue("xl", "base")}
		border={useColorModeValue("1px", "none")}
		borderColor={"gray.200"}
		rounded={{ sm: "lg" }}
		{...props}
	/>
)