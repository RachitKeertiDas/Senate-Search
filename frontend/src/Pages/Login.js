import React from "react";
import { Center, Card, Text } from "@mantine/core";
import LoginButton from "../components/LoginButton";

function Login() {
  return (
    <Center style={{ height: "100vh" }}>
      <Card shadow="sm" padding="lg" radius="md">
        <Card.Section>{/* Image to be posted here */}</Card.Section>
        <Text>
          Welcome to IITH Senate Search portal. Here you can easily view and
          track Senate Meeting Minutes
        </Text>
        <LoginButton />
      </Card>
    </Center>
  );
}

export default Login;
