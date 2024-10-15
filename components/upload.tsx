// import {
// 	Button,
// 	HStack,
// 	Text,
// 	useBoolean,
// 	Tag,
// 	TagCloseButton,
// 	TagLabel,
// 	TagRightIcon,
// 	useToast,
// } from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import { useRef, useState, useEffect } from "react";
// import { BsDownload } from "react-icons/bs";
// import request from "superagent";

// export function Upload(props: {
// 	onSelect: (file: string | undefined) => void;
// 	initialFile: string | undefined;
// 	title: string;
// 	isReadonly?: boolean;
// }) {
// 	const ref = useRef<HTMLInputElement>(null);
// 	const [file, setFile] = useState<string>();
// 	const [loading, setLoading] = useBoolean(false);
// 	const router = useRouter();
// 	const toast = useToast();

// 	useEffect(() => {
// 		setFile(props.initialFile);
// 	}, [props.initialFile]);

// 	const uploadFile = async (file: File) => {
// 		if (!file) return;

// 		if (file.size > 1024 * 1024) {
// 			toast({
// 				title: "Error",
// 				description: "File size should be less than 1MB.",
// 				status: "error",
// 				duration: 3000,
// 			});
// 			return;
// 		}

// 		setLoading.on();
// 		try {
// 			const { fileName, filePath }: { fileName: string; filePath: string } = (
// 				await request
// 					.post("/api/upload")
// 					.set(
// 						"Authorization",
// 						"bearer " + localStorage.getItem("auth-token")!
// 					)
// 					.set("snapshotId", router.query.snapshotId as string)
// 					.attach("file", file)
// 			).body;
// 			setFile(filePath);
// 			props.onSelect(filePath);
// 		} catch (error) {
// 			console.error("Error uploading file:", error);
// 			toast({
// 				title: "Error",
// 				description: "Could not upload file.",
// 				status: "error",
// 				duration: 3000,
// 			});
// 		} finally {
// 			setLoading.off();
// 		}
// 	};

// 	if (props.isReadonly) {
// 		return (
// 			<Tag>
// 				<TagLabel>{file}</TagLabel>
// 				{file && <TagRightIcon as={DownloadButton} file={file} />}
// 			</Tag>
// 		);
// 	}


// 	return (
// 		<HStack my={5} flexDirection={{ base: "column", xl: "row" }}>
// 			<Text>Upload Document</Text>
// 			<Button
// 				colorScheme={"teal"}
// 				onClick={() => {
// 					if (ref.current) {
// 						ref.current.click()
// 					}
// 				}}
// 				isLoading={loading}
// 			>
// 				Upload
// 			</Button>
// 			<input
// 				type="file"
// 				ref={ref}
// 				// TODO allow png only for profile
// 				accept=".pdf,.png"
// 				onChange={(e) => {
// 					if (e.target.files) {
// 						uploadFile(e.target.files[0])
// 					}
// 				}}
// 				style={{
// 					display: "none",
// 				}}
// 			/>
// 			{file && (file.endsWith(".pdf") || file.endsWith("png")) && (
// 				<Tag>
// 					<TagLabel>{file}</TagLabel>
// 					<TagRightIcon as={DownloadButton} file={file} />

// 					<TagCloseButton
// 						onClick={async () => {
// 						try {var res = await request
// 							.delete("/api/upload?file=" + file)
// 							.set(
// 								"Authorization",
// 								"bearer " +
// 									localStorage.getItem("auth-token")!
// 							)
// 							.set(
// 								"snapshotid",
// 								router.query.snapshotId as string
// 								)
// 							   props.onSelect(undefined)
// 							   setFile(undefined)
// 							}
// 							catch(e){
							
// 									toast({
// 										title: "Error",
// 										description: "Could not delete file",
// 										status: "error",
// 										duration: 3000,
// 									})
// 							}
// 								// setFile(undefined)
// 							}
// 						}
// 					/>
// 				</Tag>
// 			)}
// 		</HStack>
// 	)
// }

// function DownloadButton({ file }: { file: string }) {
// 	return (
// 		<BsDownload
// 			aria-label="Download File"
// 			style={{
// 				cursor: "pointer",
// 				margin: "0 0.5rem",
// 			}}
// 			onClick={async () => {
// 				const pdf = await request
// 					.get("/api/file/" + file)
// 					.set(
// 						"Authorization",
// 						"bearer " + localStorage.getItem("auth-token")!
// 					)
// 					.responseType("blob")
// 					.send()

// 				if (
// 					window.navigator &&
// 					// @ts-expect-error
// 					window.navigator.msSaveOrOpenBlob
// 				) {
// 					// @ts-expect-error
// 					window.navigator.msSaveOrOpenBlob(pdf.body)
// 				} else {
// 					// For other browsers: create a link pointing to the ObjectURL containing the blob.
// 					const objUrl = window.URL.createObjectURL(pdf.body)

// 					let link = document.createElement("a")
// 					link.target = "_blank"
// 					link.rel = "noopener noreferrer"
// 					link.href = objUrl
// 					link.download = file
// 					link.click()

// 					// For Firefox it is necessary to delay revoking the ObjectURL.
// 					setTimeout(() => {
// 						window.URL.revokeObjectURL(objUrl)
// 					}, 250)
// 				}
// 			}}
// 		/>
// 	)
// }



import {
    Button,
    HStack,
    Text,
    useBoolean,
    Tag,
    TagCloseButton,
    TagLabel,
    TagRightIcon,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import request from "superagent";

export function Upload(props: {
    onSelect: (file: string | undefined) => void;
    initialFile: string | undefined;
    title: string;
    isReadonly?: boolean;
}) {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<string | undefined>(props.initialFile);
    const [loading, setLoading] = useBoolean(false);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        setFile(props.initialFile);
    }, [props.initialFile]);

    const uploadFile = async (file: File) => {
        if (!file) return;

        if (file.size > 1024 * 1024) {
            toast({
                title: "Error",
                description: "File size should be less than 1MB.",
                status: "error",
                duration: 3000,
            });
            return;
        }

        setLoading.on();
        try {
            const { fileName, filePath }: { fileName: string; filePath: string } = (
                await request
                    .post("/api/upload")
                    .set(
                        "Authorization",
                        "bearer " + localStorage.getItem("auth-token")!
                    )
                    .set("snapshotId", router.query.snapshotId as string)
                    .attach("file", file)
            ).body;
            setFile(filePath);
            props.onSelect(filePath);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast({
                title: "Error",
                description: "Could not upload file.",
                status: "error",
                duration: 3000,
            });
        } finally {
            setLoading.off();
        }
    };

    if (props.isReadonly) {
        return (
            <Tag>
                <TagLabel>{file}</TagLabel>
                {file && <TagRightIcon as={DownloadButton} file={file} />}
            </Tag>
        );
    }

    return (
        <HStack my={5} flexDirection={{ base: "column", xl: "row" }}>
            <Text>Upload Document</Text>
            <Button
                colorScheme={"teal"}
                onClick={() => {
                    if (ref.current) {
                        ref.current.click()
                    }
                }}
                isLoading={loading}
            >
                Upload
            </Button>
            <input
                type="file"
                ref={ref}
                accept=".pdf,.png"
                onChange={(e) => {
                    if (e.target.files) {
                        uploadFile(e.target.files[0])
                    }
                }}
                style={{
                    display: "none",
                }}
            />
            {file && (file.endsWith(".pdf") || file.endsWith(".png")) && (
                <Tag>
                    <TagLabel>{file}</TagLabel>
                    <TagRightIcon as={DownloadButton} file={file} />
                    <TagCloseButton
                        onClick={async () => {
                            try {
                                var res = await request
                                    .delete("/api/upload?file=" + file)
                                    .set(
                                        "Authorization",
                                        "bearer " +
                                            localStorage.getItem("auth-token")!
                                    )
                                    .set(
                                        "snapshotid",
                                        router.query.snapshotId as string
                                    )
                                props.onSelect(undefined)
                                setFile(undefined)
                            }
                            catch(e){
                                toast({
                                    title: "Error",
                                    description: "Could not delete file",
                                    status: "error",
                                    duration: 3000,
                                })
                            }
                        }}
                    />
                </Tag>
            )}
        </HStack>
    )
}

function DownloadButton({ file }: { file: string }) {
    return (
        <BsDownload
            aria-label="Download File"
            style={{
                cursor: "pointer",
                margin: "0 0.5rem",
            }}
            onClick={async () => {
                const pdf = await request
                    .get("/api/file/" + file)
                    .set(
                        "Authorization",
                        "bearer " + localStorage.getItem("auth-token")!
                    )
                    .responseType("blob")
                    .send()

                if (
                    window.navigator &&
                    // @ts-expect-error
                    window.navigator.msSaveOrOpenBlob
                ) {
                    // @ts-expect-error
                    window.navigator.msSaveOrOpenBlob(pdf.body)
                } else {
                    // For other browsers: create a link pointing to the ObjectURL containing the blob.
                    const objUrl = window.URL.createObjectURL(pdf.body)

                    let link = document.createElement("a")
                    link.target = "_blank"
                    link.rel = "noopener noreferrer"
                    link.href = objUrl
                    link.download = file
                    link.click()

                    // For Firefox it is necessary to delay revoking the ObjectURL.
                    setTimeout(() => {
                        window.URL.revokeObjectURL(objUrl)
                    }, 250)
                }
            }}
        />
    )
}
