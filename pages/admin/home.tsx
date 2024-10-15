import {
	Button,
	ThemeProvider,
	extendTheme,
	Table,
	TableCaption,
	CSSReset,
	Box,
	Container,
	Flex,
	Image,
} from "@chakra-ui/react"
import { Line } from "react-chartjs-2"
import React, { useEffect, useRef, useState } from "react"
import {
	BsBarChartLine,
	BsBarChartLineFill,
	BsFolderSymlinkFill,
	BsUiChecks,
} from "react-icons/bs"
import { FieldGroup } from "@prisma/client"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import prisma from "../../lib/prisma"
import Link from "next/link"
import FormWidget from "../../components/formWidget"
import request from "superagent"
import { Card } from "../../components/card"
import { Sidebar } from "../../components/admin/sidebar"
import { HomeIcon } from "../../components/Icons/Icons"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Pie, Bar } from "react-chartjs-2"
const { faker } = require("@faker-js/faker")

// .container {
//     width: 1000px;
//     height:600px
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const { id } = context.query
	// if (!Array.isArray(id)) {
	// 	const req = await prisma.verificationRequest.findUnique({
	// 		where: { id: id },
	// 	})
	// 	console.log(dayjs().diff(dayjs(req!.createdAt), "days"))

	// 	if (dayjs().diff(dayjs(req!.createdAt), "days") > 1) {
	// 		await prisma.user.delete({
	// 			where: { id: req!.userId },
	// 		})
	// 		await prisma.verificationRequest.delete({
	// 			where: { id: req!.id },
	// 		})
	// 		return {
	// 			props: {
	// 				verified: false,
	// 			},
	// 		}
	// 	}

	const uc = await prisma.snapshot.count({
		where: { isComplete: false },
	})
	const c = await prisma.snapshot.count({
		where: { isComplete: true },
	})

	// 	await prisma.user.update({
	// 		where: { id: req!.userId },
	// 		data: {
	// 			verified: true
	// 		},
	// 	})

	// 	return {
	// 		props: {
	// 			verified: true,
	// 		},
	// 	}
	// }
	const labels = ["January", "Febuary", "March"]
	const data = {
		labels,
		datasets: [
			{
				label: "Applications Submitted",
				data: [c,1,c],
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Applications Underway",
				data: [uc,uc,uc],
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	}
	return {
		props: {
			data,
		},
	}
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export const options = {
	responsive: true,
	maintainAspectRatio: false,
	// scale: ,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "User Statistics",
		},
	},
}
const labels = ["January, Febuary, March"]
// export const data = {
// 	labels,
// 	datasets: [
// 		{
// 			label: "Applications Submitted",
// 			data: labels.map(() =>
// 				faker.datatype.number({ min: 0, max: 1000 })
// 			),
// 			backgroundColor: "rgba(255, 99, 132, 0.5)",
// 		},
// 		{
// 			label: "Applications Underway",
// 			data: labels.map(() =>
// 				faker.datatype.number({ min: 0, max: 1000 })
// 			),
// 			backgroundColor: "rgba(53, 162, 235, 0.5)",
// 		},
// 	],
// }
export default function Home(props: {
	data: {
		labels: string[]
		datasets: {
			label: string
			data: number
			backgroundColor: string
		}[]
	}
}) {
	return (
		<Flex direction={"column"} alignItems="center">
			<Box
				sx={{
					width: "calc(100vw - 270px)",
					height: "80vh",
				}}
			>
				<Bar options={options} data={props.data} />
			</Box>
			<Box borderWidth="1px" borderRadius="lg" mt={1} p={2}>
				Current Advertisement
			</Box>
			<Box alignSelf="center" mt={2}>
				<Image
					src={
						"https://i0.wp.com/bibliophilevirtuallibrary.com/wp-content/uploads/2020/03/iii.jpg?w=878&ssl=1"
					}
					alt={"Advert"}
				></Image>
			</Box>
		</Flex>
	)
}
