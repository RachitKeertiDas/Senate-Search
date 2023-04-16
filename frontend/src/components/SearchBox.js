import React, { useState } from "react";
import "./SearchBox.css";

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
    <div className="search-box-container">
      <h2 className="search-box-heading">Search Box</h2>
      <form onSubmit={handleSearch} className="search-box-form">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleInputChange}
          className="search-box-input" // Apply styles to input
        />
        <button type="submit" className="search-box-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
