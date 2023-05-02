import React from "react";
import { Card, Text, Container } from "@mantine/core";
import LoginButton from "../components/LoginButton";
import Shell from "../components/AppShell";

function Login() {
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
                  Welcome to IITH Senate Search portal.
                  <br />
                </Text>
                <Text>
                  Here you can easily view and track previous Senate Meeting
                  Minutes.
                </Text>
                <LoginButton />
              </Container>
            </Card>
 
      }
    />
  );
}

export default Login;
