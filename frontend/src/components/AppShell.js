import { AppShell, Header, Image, Center,rem } from "@mantine/core";
import NavbarMinimal from "./Navbar";
import React from "react";
import HorizontalLogo from "../assets/horzlogolong.png";

// eslint-disable-next-line react/prop-types
function Shell({ content }) {
	return (
		<AppShell
			padding={0}
			navbar={<NavbarMinimal>{/* Navbar content */}</NavbarMinimal>}
			header={
				<Header height={rem("10vh")} p="xs">
					{
						<Image
							src={HorizontalLogo}
							height={rem("7vh")}
							fit="contain"
							alt="IITH Logo"
						/>
					}
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>

      <div>
					<Center
						style={{
							height: "90vh",
							maxWidth: "100vw",
							backgroundColor: "#FFE8CC",
						}}
					>
						
			{content}
      
					</Center>
				</div>
		</AppShell>
	);
}

export default Shell;
