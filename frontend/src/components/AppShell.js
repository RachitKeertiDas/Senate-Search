import { AppShell, Header, Image, rem } from "@mantine/core";
import NavbarMinimal from "./Navbar";
import React from "react";
import HorizontalLogo from "../assets/horzlogolong.png";

// eslint-disable-next-line react/prop-types
function Shell({ content }) {
  return (
    <AppShell
      padding="md"
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
      {content}
    </AppShell>
  );
}

export default Shell;
