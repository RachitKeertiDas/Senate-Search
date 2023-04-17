import React from "react";
import { Center, Card, Text, Image, Container } from "@mantine/core";
import LoginButton from "../components/LoginButton";
import HorizontalLogo from "../assets/horzlogolong.png";

function Login() {
  return (
    <Center
      style={{ height: "100vh", maxWidth: "100vw", backgroundColor: "#FFE8CC" }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        display="flex"
        style={{ flexDirection: "row" }}
      >
        <Image
          src={HorizontalLogo}
          height={100}
          fit="contain"
          alt="IITH Logo"
        />
        <Container>
          <Text fw={700}>
            Welcome to IITH Senate Search portal.
            <br />
          </Text>
          <Text>
            Here you can easily view and track previous Senate Meeting Minutes.
          </Text>
          <LoginButton />
        </Container>
      </Card>
    </Center>
  );
}

export default Login;
