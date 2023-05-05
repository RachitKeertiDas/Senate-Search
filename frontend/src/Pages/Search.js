import React from "react";
import { Card, Text, Container } from "@mantine/core";
import SearchBox from "../components/SearchBox";
import Shell from "../components/AppShell";
function Search() {
  return (
    <Shell
      content={
        <Card>
          <Container>
            <Text fw={700}>
              Welcome to IITH Senate Search portal- Search.
              <br />
            </Text>
            <Text>
              Enter your search term to retrieve relevant proposals to your
              query.
            </Text>
            <SearchBox />
          </Container>
        </Card>
      }
    />
  );
}

export default Search;
