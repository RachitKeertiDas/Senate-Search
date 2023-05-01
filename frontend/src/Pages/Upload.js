import React from "react";
// import { Center, Card, Text, Image, Container } from "@mantine/core";
import { Center, Card, Text, Container } from "@mantine/core";
// import LoginButton from "../components/LoginButton";
// import HorizontalLogo from "../assets/horzlogolong.png";
import UploadButton from "../components/UploadButton";
import Shell from "../components/AppShell";

function Upload() {
  return (
    <Shell
      content={
        <div>
          <Center
            style={{
              height: "90vh",
              maxWidth: "100vw",
              backgroundColor: "#FFE8CC",
            }}
          >
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
                <Text>
                  Here you can easily view and track previous Senate Meeting
                  Minutes.
                </Text>
                <UploadButton />
              </Container>
            </Card>
          </Center>
        </div>
      }
    />
  );
}

export default Upload;
