import React, { useState, useEffect } from "react";
import axios from "axios";
import { Center, Text } from "@mantine/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Shell from "../components/AppShell";

function ViewMeetings() {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const [pdfFile, setPdfFile] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8000/minutes/pdf/49", {
				responseType: "arraybuffer",
			})
			.then((response) => {
				const pdfBlob = new Blob([response.data], { type: "application/pdf" });
				const pdfUrl = URL.createObjectURL(pdfBlob);
				setPdfFile(pdfUrl);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<Shell
			content={
				<Center>
					<Center
						style={{
							height: "90vh",
							minWidth: "80vw",
							backgroundColor: "#FFE8CC",
						}}
					>
						{pdfFile && (
							<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
								<Viewer
									fileUrl={pdfFile}
									plugins={[defaultLayoutPluginInstance]}
								/>
							</Worker>
						)}

						{!pdfFile && (
							<Center>
								<Text
									style={{
										fontSize: "20px",
									}}
								>
									No PDF Found!
								</Text>
							</Center>
						)}
					</Center>
				</Center>
			}
		/>
	);
}

export default ViewMeetings;
