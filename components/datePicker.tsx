import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@chakra-ui/icons"
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	SimpleGrid,
} from "@chakra-ui/react"
import { differenceInYears, getDaysInMonth } from "date-fns"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { SuperInputProps } from "./superInput/types"
import { MapType } from "../lib/formEntries"

export function DatePicker(props: SuperInputProps<MapType>) {
	const [date, setDate] = useState<Dayjs | undefined>(
		props.value ? dayjs(props.value.content) : undefined
	)

	useEffect(() => {
		setDate(props.value ? dayjs(props.value.content) : undefined)
	}, [props.value])

	return (
		<>
			<Popover isLazy>
				{({ onClose }) => (
					<>
						<PopoverTrigger>
							<Input
								value={date?.format("DD-MM-YYYY")}
								placeholder={props.placeholder}
								readOnly
								colorScheme={"teal"}
								focusBorderColor="teal.400"
							/>
						</PopoverTrigger>
						<PopoverContent width={"max-content"}>
							<PopoverCloseButton />
							<PopoverBody>
								<Calendar
									onSelect={(date) => {
										setDate(date)
										props.onChoose({
											content: date.toISOString(),
											required: false,
										})
										onClose()
									}}
								/>
							</PopoverBody>
						</PopoverContent>
					</>
				)}
			</Popover>
		</>
	)
}

const monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function Calendar(props: { onSelect: (date: Dayjs) => void; value?: Dayjs }) {
	const [date, setDate] = useState(props.value ?? dayjs())

	return (
		<>
			<Center mb={4} mt={2}>
				<ButtonGroup isAttached>
					<IconButton
						aria-label="previous-month"
						icon={<ChevronLeftIcon />}
						onClick={() => {
							setDate(date.subtract(1, "month"))
						}}
					/>
					<Menu>
						<MenuButton as={Button}>
							{monthNamesShort[date.month()]}
						</MenuButton>
						<MenuList>
							{monthNamesShort.map((month, index) => (
								<MenuItem
									key={index}
									onClick={() => {
										setDate((date) => date.month(index))
									}}
								>
									{month}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton as={Button}>{date.year()}</MenuButton>
						<MenuList maxH={"50vh"} overflowY={"scroll"}>
							{[
								...Array(
									differenceInYears(
										Date.now(),
										dayjs().year(1960).toDate()
									)
								),
							].map((_, index) => (
								<MenuItem
									key={index}
									onClick={() =>
										setDate((d) =>
											d.year(
												dayjs()
													.subtract(index, "year")
													.year()
											)
										)
									}
								>
									{dayjs().subtract(index, "year").year()}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<IconButton
						aria-label="next-month"
						icon={<ChevronRightIcon />}
						onClick={() => {
							setDate(date.add(1, "month"))
						}}
					/>
				</ButtonGroup>
			</Center>
			<SimpleGrid columns={7} spacing={2}>
				{weekdayNamesShort.map((day, index) => (
					<Box
						key={index}
						textAlign={"center"}
						color={"gray.500"}
						fontWeight={"bold"}
					>
						{day}
					</Box>
				))}
			</SimpleGrid>
			<SimpleGrid columns={7} spacing={2} mt={5}>
				{[
					...Array(date.date(1).day()).fill(-1),
					...Array(getDaysInMonth(date.toDate())).fill(0),
				].map((day, index) => (
					<>
						{!(day === -1) ? (
							<Button
								key={day}
								variant={"ghost"}
								onClick={() => {
									setDate((d) =>
										d.date(index + 1 - date.date(1).day())
									)
									props.onSelect(
										date.date(
											index + 1 - date.date(1).day()
										)
									)
								}}
							>
								{index + 1 - date.date(1).day()}
							</Button>
						) : (
							<Box />
						)}
					</>
				))}
			</SimpleGrid>
		</>
	)
}
