import { Field, Entry } from "@prisma/client"
import { z } from "zod"
import { MapType } from "../../lib/formEntries"
import { FieldModel, EntryModel } from "../../prisma/zod"

export interface SuperInputProps<T> {
	type?: string
	onChoose: (value: T) => void
	value?: T
	placeholder?: string
	label?: string
	options?: T[]
	fields?: Field[]
	entries?: Entry[]
	fieldId?: number
	allowFile?: boolean
	onChooseFile?: (file: MapType | undefined) => void
	isReadonly?: boolean
	isRequired?: boolean
}

export interface TableData {
	fieldId: number
	entries: {
		content: string
		fieldId: number
		required: boolean
	}[]
}

export const TableSchema = z.array(
	z.object({
		fieldId: z.number(),
		entries: z.array(
			z.object({
				content: z.string(),
				fieldId: z.number(),
				required: z.boolean(),
			})
		),
	})
)

export const SuperInputPropsSchema = z.object({
	type: z.string(),
	placeholder: z.string().optional(),
	label: z.string().optional(),
	fields: z.array(FieldModel).optional(),
	entries: z.array(EntryModel).optional(),
	fieldId: z.number().optional(),
	allowFile: z.boolean().optional(),
	isReadonly: z.boolean().optional(),
	isRequired: z.boolean().optional(),
})

export const MapTypeSchema = z.object({
	content: z.string(),
	required: z.boolean()
})

export const DefaultInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z
		.array(MapTypeSchema)
		.refine((val) => val.length === 0)
		.optional(),
})

export const DateInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z
		.array(MapTypeSchema)
		.refine((val) => val.length === 0)
		.optional(),
})

export const RadioInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z.array(MapTypeSchema).optional(),
})

export const SelectInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z.array(MapTypeSchema).optional(),
})

export const TableInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(TableSchema).returns(z.void()),
	value: z.any().optional(),
	options: z
		.array(TableSchema)
		.refine((val) => val.length === 0)
		.optional(),
})

export const RichInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: z.union([MapTypeSchema, z.any()]).optional(),
	options: z
		.array(MapTypeSchema)
		.refine((val) => val.length === 0)
		.optional(),
})

export const NumberInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z.array(MapTypeSchema).optional(),
})

export const GrowableInputPropsSchema = SuperInputPropsSchema.extend({
	onChoose: z.function().args(MapTypeSchema).returns(z.void()),
	value: MapTypeSchema.optional(),
	options: z.array(MapTypeSchema).optional(),
})