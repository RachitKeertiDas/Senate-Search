import React, { useEffect, useState } from "react";
import { Link, useLocation, matchRoutes } from "react-router-dom";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from "@mantine/core";
import { googleLogout } from "@react-oauth/google";
import {
  IconHome2,
  IconSearch,
  IconLogout,
  IconUpload,
  IconBook,
  IconClipboardCheck,
} from "@tabler/icons-react"; // import HorizontalLogo from "../assets/horzlogolong.png";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

// eslint-disable-next-line react/prop-types
function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const logoutFunction = () => {
  googleLogout();
  localStorage.setItem("user", JSON.stringify(null));
  // setProfile(null);
};

const routes = [
  { path: "/", index: 0 },
  { path: "/search/", index: 1 },
  { path: "/upload", index: 2 },
  { path: "/agenda", index: 3 },
  { path: "/handbook", index: 4 },
  { path: "/view_minutes", index: 5 },
];
const mockdata = [
  { iconData: { icon: IconHome2, label: "Home" }, route: "/" },
  { iconData: { icon: IconSearch, label: "Search" }, route: "/search" },
  { iconData: { icon: IconUpload, label: "Upload" }, route: "/upload" },
  { iconData: { icon: IconClipboardCheck, label: "Agenda" }, route: "/agenda" },
  {
    iconData: { icon: IconBook, label: "Academic Handbook" },
    route: "/handbook",
  },
];

function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    // eslint-disable-next-line
    <Link to={link.route}>
      <NavbarLink
        {...link.iconData}
        key={link.iconData.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  // Set Active-Icon for current Route
  const location = useLocation();
  const final = matchRoutes(routes, location);
  useEffect(() => {
    setActive(final[0].route.index);
  }, []);

  return (
    <Navbar height={rem("90vh")} width={{ base: 80 }} p="md">
      <Center>{/* <HorizontalLogo type="mark" size={30} /> */}</Center>
      <Navbar.Section grow mt={0}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {/* <NavbarLink icon={} label="Change account" /> */}
          <NavbarLink
            icon={IconLogout}
            onClick={logoutFunction}
            label="Logout"
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarMinimal;
