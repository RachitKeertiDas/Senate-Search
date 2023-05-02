import React, { useState } from "react";
import { Input, Button, Container, Accordion, ScrollArea } from "@mantine/core";

function SearchBox() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		// Handle search logic here
		const res = await fetch(`http://localhost:8000/search?query=${searchTerm}`);
		const response = await res.json();

		console.log("Searching for:", searchTerm);
		console.log(response);
		setSearchResults(response);
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
					<Button type="submit" mt={4}>
						Search
					</Button>
				</form>
				<ScrollArea height={"50vh"} style={{ maxHeight: "50vh" }} type="always">
					<Accordion
						height={"50vh"}
						style={{ maxHeight: "50vh" }}
						type="always"
					>
						{searchResults.map((item, index) => (
							<Accordion.Item key={index} value={item.proposal_id}>
								<Accordion.Control>
									{item.proposal_id}:{" "}
									{item.proposal.length > 100
										? item.proposal.substr(0, 100) + "..."
										: item.proposal}
								</Accordion.Control>
								<Accordion.Panel>{item.resolution}</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
				</ScrollArea>
			</Container>
		</div>
	);
}

export default SearchBox;
