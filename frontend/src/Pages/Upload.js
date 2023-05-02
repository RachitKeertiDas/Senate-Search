import React from "react";
import { Text, Container,Card } from "@mantine/core";
import UploadButton from "../components/UploadButton";
import Shell from "../components/AppShell";

function Upload() {
	return (
		<Shell
			content={
        <Card
        shadow="sm"
        padding="lg"
        radius="md"
        display="flex"
        style={{ flexDirection: "row" }}
      >
							<Container>
								<Text fw={700}>
									Welcome to IITH Senate Search portal- Upload.
									<br />
								</Text>
								<Text>Please upload the relevant PDF Documents.</Text>
								<UploadButton />
							</Container>
						</Card>
			}
		/>
	);
}

export default Upload;
