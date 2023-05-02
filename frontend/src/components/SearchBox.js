import React, { useState } from "react";
import { Input, Button, Container, Accordion } from "@mantine/core";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([{ hi: "hi" }]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Handle search logic here
    const res = await fetch(`http://localhost:8000/search?query=${searchTerm}`);
    const response = await res.json();

    console.log("Searching for:", searchTerm);
    //setSearchResults(response);
  };

  return (
    <div>
      <Container>
        <h2>Search Box</h2>
        <form onSubmit={handleSearch}>
          <Input
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Enter search term"
            className="search-box-input" // Apply custom styles to input
          />
          <Button type="submit">Search</Button>
        </form>
        <Accordion>
          {searchResults.map((item) => (
            <Accordion.Item value="hi">
              <Accordion.Control>Hello</Accordion.Control>
              <Accordion.Panel>Hi</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

export default SearchBox;
