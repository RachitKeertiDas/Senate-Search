import React, { useState } from "react";
import { Input, Button } from "@mantine/core";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
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
    </div>
  );
}

export default SearchBox;
