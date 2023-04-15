// // import React, { useState } from "react";

// // function SearchBox() {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     // Handle search logic here
// //     console.log("Searching for:", searchTerm);
// //   };

// //   return (
// //     <div>
// //       <h2>Search Box</h2>
// //       <form onSubmit={handleSearch}>
// //         <input
// //           type="text"
// //           placeholder="Enter search term"
// //           value={searchTerm}
// //           onChange={handleInputChange}
// //         />
// //         <button type="submit">Search</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default SearchBox;

// import React, { useState } from "react";
// import "./SearchBox.css"; // Import your custom CSS file for SearchBox

// function SearchBox() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Handle search logic here
//     console.log("Searching for:", searchTerm);
//   };

//   return (
//     <div className="search-box-container"> {/* Use a container div for styling */}
//       <h2 className="search-box-heading">Search Box</h2> {/* Apply styles to heading */}
//       <form className="search-box-form" onSubmit={handleSearch}> {/* Apply styles to form */}
//         <input
//           className="search-box-input" {/* Apply styles to input */}
//           type="text"
//           placeholder="Enter search term"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         <button className="search-box-button" type="submit">Search</button> {/* Apply styles to button */}
//       </form>
//     </div>
//   );
// }

// export default SearchBox;

import React, { useState } from "react";
import "./SearchBox.css"; // Import CSS file for styles

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

