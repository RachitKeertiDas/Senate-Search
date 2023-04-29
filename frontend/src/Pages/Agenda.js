import React from "react";
import { Center, Card, Text, Container } from "@mantine/core";
import PDFviewer from "../components/PDFviewer";
import Shell from "../components/AppShell";

function Agenda() {
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
            <Card>
              <Container>
                <Text fw={700}>
                  Welcome to IITH Senate Search portal- Agenda.
                  <br />
                </Text>
                <Text>
                  Here you can easily view and track previous Senate Meeting
                  Minutes.
                </Text>
                <PDFviewer />
              </Container>
            </Card>
          </Center>
        </div>
      }
    />
  );
}

export default Agenda;
