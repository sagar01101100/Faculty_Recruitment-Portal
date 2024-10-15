import { TableData } from "../components/superInput/types"

export interface MapType {
	content: string,
	required: boolean
}

export interface GenericEntry {
	fieldId: number
	content: string | number | boolean | undefined
	isFile?: boolean
	required: boolean
}

export interface TableEntry {
	fieldId: number
	entries: GenericEntry[]
}

export interface SuperFormData {
	entries: { [key: number]: TableEntry[] | GenericEntry }
}

export function tableDataToMap(data: TableData): { [key: number]: MapType } {
	const map: { [key: number]: MapType } = {}
	data.entries.forEach((entry) => {
		map[entry.fieldId] = { content: entry.content, required: entry.required }
	})
	return map
}

// export function mapToTabledata(
// 	data: { [key: number]: string },
// 	fieldId: number
// ): TableData {
// 	return {
// 		fieldId,
// 		entries: Object.entries(data).map(([key, value]) => ({
// 			content: value,
// 			fieldId: parseInt(key),
// 		})),
// 	}
// }
export function mapToTabledata(
	data: { [key: number]: MapType },
	fieldId: number
): TableData {
	return {
		fieldId,
		entries: Object.entries(data).map(([key, value]) => ({
			fieldId: parseInt(key),
			content: value.content,
			required: value.required,
		})),
	}
}