import React from "react";
// import { Center, Card, Text, Image, Container,Header } from "@mantine/core";
import { Center, Card, Text, Container} from "@mantine/core";
// import LoginButton from "../components/LoginButton";
// import HorizontalLogo from "../assets/horzlogolong.png";
// import UploadButton from "../components/UploadButton";
import SearchBox from "../components/SearchBox";
// import  NavbarMinimal  from "../components/Navbar";
import Shell from "../components/AppShell";
function Search() {
  return (
    
      <Shell content={<div>
      <Center
      style={{ height: "90vh", maxWidth: "100%", backgroundColor: "#FFE8CC" }}
      >
      
      <Card>

        <Container>
          <Text fw={700}>
            Welcome to IITH Senate Search portal- Search.
            <br />
          </Text>
          <Text>
            Here you can easily view and track previous Senate Meeting Minutes.
          </Text>
          <SearchBox/>
        </Container>
      </Card>
    </Center>
    </div>
      }/>
  );
}

export default Search;
