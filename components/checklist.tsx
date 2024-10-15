import {
	CheckboxGroup,
	Stack,
	Checkbox,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@chakra-ui/react"
import { useEffect, useState} from "react"
import { useRouter } from "next/router"
import { useQueryClient, useMutation, useQuery } from "react-query"
import request from "superagent"
import prisma from "../lib/prisma"
import { Field} from "@prisma/client"


type CheckList = {
	id: number
	title: string
	checked: boolean
}[]

export function CheckList(props: { onSave: () => void }) {
	const router = useRouter()
	const [checkList, setChecklist] = useState<CheckList | null>(null)
	const getCheckList = async () => {
		const res = await request
			.post("/api/checklist")
			.set(
				"Authorization",
				`Bearer ${localStorage.getItem("auth-token")}`
			).send({snapshotId: router.query.snapshotId as string, funcType: "get"})
		const allCheckFields: {
			id: number
			title: string
		}[] = res.body.checkFields
		const checkedFields: {
			id: number
			field: Field | null
		}[] = res.body.checkedFields
		setChecklist(
			allCheckFields.map((item) => ({
				id: item.id,
				title: item.title,
				checked: checkedFields.some((cf) => item.id === cf.field?.id),
			}))
		)
	}
	const [modifiedCheckData, setCheckData] = useState<
		{ id: number; checked: boolean }[]
	>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getCheckList()
	}, [])

	useEffect(() => {}, [checkList])

	const modifyChecklist = useMutation(
		async (newCheckList: { id: number; checked: boolean }[]) => {
			return request
				.post("/api/checklist")
				.set(
					"Authorization",
					`Bearer ${localStorage.getItem("auth-token")}`
				)
				.send({
					newCheckList: newCheckList,
					snapshotId: router.query.snapshotId as string,
					funcType: "modify",
				})
		}
	)

	return (
		<>
			<DrawerHeader>Check List</DrawerHeader>
			<DrawerBody>
				<Stack spacing={5}>
					{checkList?.map((item) => (
						<Checkbox
							value={item.id}
							key={item.id}
							defaultChecked={item.checked}
							onChange={(e) => {
								const index = modifiedCheckData.findIndex(
									(item) =>
										item.id === parseInt(e.target.value)
								)
								if (index !== -1) {
									const newData = [...modifiedCheckData]
									newData[index].checked = e.target.checked
									setCheckData(newData)
								} else {
									setCheckData((data) => [
										...data,
										{
											id: parseInt(e.target.value),
											checked: e.target.checked,
										},
									])
								}
							}}
						>
							{item.title}
						</Checkbox>
					))}
				</Stack>
			</DrawerBody>
			<DrawerFooter>
				<Button
					colorScheme={"green"}
					isDisabled={modifiedCheckData.length <= 0}
					onClick={async () => {
						setLoading(true)
						await modifyChecklist.mutateAsync(modifiedCheckData)
						props.onSave()
					}}
					isLoading={loading}
				>
					Save
				</Button>
			</DrawerFooter>
		</>
	)
}
