import React from "react";
import { Center, Card, Text, Container } from "@mantine/core";
import SearchBox from "../components/SearchBox";
import Shell from "../components/AppShell";
function Search() {
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
                  Welcome to IITH Senate Search portal- Search.
                  <br />
                </Text>
                <Text>
                  Here you can easily view and track previous Senate Meeting
                  Minutes.
                </Text>
                <SearchBox />
              </Container>
            </Card>
          </Center>
        </div>
      }
    />
  );
}

export default Search;
