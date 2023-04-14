import React from "react";
import { Center, Card, Text, Button } from '@mantine/core';

function Login(){
    return (
        <Center style={{height:'100vh'}}>
            <Card shadow="sm" padding="lg" radius="md">
                <Card.Section>
                    {/* Image to be posted here */}
                </Card.Section>
                <Text>
                    Welcome to IITH Senate Search portal. Here you can easily view and track Senate Meeting Minutes 
                </Text>
                <Button> Sign in with Google</Button>
            </Card>
        </Center>
    );
}

export default Login;