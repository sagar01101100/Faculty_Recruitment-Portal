import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
	Box,
	Button,
	ButtonGroup,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue,
	VStack,
	Tooltip,
} from "@chakra-ui/react"
import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { SuperInputProps } from "./superInput/types"
import {
	BsTextLeft,
	BsTextCenter,
	BsTextRight,
	BsTypeBold,
	BsTypeItalic,
	BsJustify,
	BsListOl,
	BsListUl,
	BsList,
	BsListNested,
} from "react-icons/bs"
import { MapType } from "../lib/formEntries"

const Tiptap = (props: SuperInputProps<MapType>) => {
	const colorMode = useColorModeValue(undefined, "dark")
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		content: "<p>Enter your recommendation here...</p>",
		editorProps: {
			attributes: {
				class: "prose dark:prose-dark prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			props.onChoose({ content: editor.getHTML(), required: false })
		},
	})
	const headingButtonText = (editor: Editor | null) => {
		const isActive = editor?.isActive("heading")
		if (isActive) {
			return "Heading " + editor?.getAttributes("heading").level
		} else {
			return "Body"
		}
	}

	return (
		<Box
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			rounded="lg"
			className={colorMode}
		>
			<HStack mb={5}>
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<ChevronDownIcon />}
						colorScheme={"teal"}
						variant={"outline"}
					>
						{headingButtonText(editor)}
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() =>
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: 1 })
									.run()
							}
							icon={
								editor?.isActive("heading", { level: 1 }) ? (
									<CheckIcon />
								) : undefined
							}
							command="Ctrl+Alt+1"
						>
							Heading 1
						</MenuItem>
						<MenuItem
							onClick={() =>
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: 2 })
									.run()
							}
							icon={
								editor?.isActive("heading", { level: 2 }) ? (
									<CheckIcon />
								) : undefined
							}
							command="Ctrl+Alt+2"
						>
							Heading 2
						</MenuItem>
						<MenuItem
							onClick={() =>
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: 3 })
									.run()
							}
							icon={
								editor?.isActive("heading", { level: 3 }) ? (
									<CheckIcon />
								) : undefined
							}
							command="Ctrl+Alt+3"
						>
							Heading 3
						</MenuItem>
					</MenuList>
				</Menu>
				<IconButton
					variant={editor?.isActive("bold") ? "solid" : "outline"}
					onClick={() => editor?.chain().focus().toggleBold().run()}
					colorScheme={"teal"}
					aria-label="Bold"
					icon={<BsTypeBold size={25} />}
				/>
				<IconButton
					variant={editor?.isActive("italic") ? "solid" : "outline"}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
					colorScheme={"teal"}
					aria-label="Italic"
					icon={<BsTypeItalic size={25} />}
				/>
				<ButtonGroup isAttached>
					<IconButton
						aria-label="left-align"
						icon={<BsTextLeft size={25} />}
						variant={
							editor?.isActive({ textAlign: "left" })
								? "solid"
								: "outline"
						}
						onClick={() =>
							editor?.chain().focus().setTextAlign("left").run()
						}
						colorScheme={"teal"}
					/>
					<IconButton
						aria-label="center-align"
						icon={<BsTextCenter size={25} />}
						variant={
							editor?.isActive({ textAlign: "center" })
								? "solid"
								: "outline"
						}
						onClick={() =>
							editor?.chain().focus().setTextAlign("center").run()
						}
						colorScheme={"teal"}
					/>
					<IconButton
						aria-label="right-align"
						icon={<BsTextRight size={25} />}
						variant={
							editor?.isActive({ textAlign: "right" })
								? "solid"
								: "outline"
						}
						onClick={() =>
							editor?.chain().focus().setTextAlign("right").run()
						}
						colorScheme={"teal"}
					/>
					<IconButton
						aria-label="justify-align"
						icon={<BsJustify size={25} />}
						variant={
							editor?.isActive({ textAlign: "justify" })
								? "solid"
								: "outline"
						}
						onClick={() =>
							editor
								?.chain()
								.focus()
								.setTextAlign("justify")
								.run()
						}
						colorScheme={"teal"}
					/>
				</ButtonGroup>

				<ButtonGroup isAttached>
					<IconButton
						aria-label="toggle-ordered-list"
						icon={<BsListOl size={25} />}
						variant={
							editor?.isActive("orderedList")
								? "solid"
								: "outline"
						}
						onClick={() =>
							editor?.chain().focus().toggleOrderedList().run()
						}
						colorScheme={"teal"}
					/>
					<IconButton
						aria-label="toggle-unordered-list"
						icon={<BsListUl size={25} />}
						variant={
							editor?.isActive("bulletList") ? "solid" : "outline"
						}
						onClick={() =>
							editor?.chain().focus().toggleBulletList().run()
						}
						colorScheme={"teal"}
					/>
				</ButtonGroup>
				<ButtonGroup isAttached>
					<Tooltip label="Sink List">
						<IconButton
							aria-label="sink-list"
							icon={<BsListNested size={25} />}
							disabled={!editor?.can().sinkListItem("listItem")}
							onClick={() =>
								editor
									?.chain()
									.focus()
									.sinkListItem("listItem")
									.run()
							}
							colorScheme={"teal"}
						/>
					</Tooltip>
					<Tooltip label="Lift List">
						<IconButton
							aria-label="lift-list"
							icon={<BsList size={25} />}
							disabled={!editor?.can().liftListItem("listItem")}
							onClick={() =>
								editor
									?.chain()
									.focus()
									.liftListItem("listItem")
									.run()
							}
							colorScheme={"teal"}
						/>
					</Tooltip>
				</ButtonGroup>
			</HStack>
			<EditorContent editor={editor} className="dark:prose-dark" />
		</Box>
	)
}

export default Tiptap
