import { Heading, HStack, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";

export default function Navbar() {
  return (
    <HStack
      bg="#01293f"
      gap="8"
      py="4"
      px={{ base: "8", sm: "12" }}
      justify={{ base: "center", sm: "initial" }}
    >
      <HStack gap="2" mr={{ sm: "auto" }}>
        <Heading color="white" size="md" display={{ base: "none", sm: "initial" }}>
          RoomConnect
        </Heading>
        <Box>
          <IoHome color="white" />
        </Box>
      </HStack>

      <NavLink to="/search">
        {({ isActive }) => (
          <Heading color={isActive ? "#fca95a" : "white"} size="md">
            Search
          </Heading>
        )}
      </NavLink>
      <NavLink to="/profile">
        {({ isActive }) => (
          <Heading color={isActive ? "#fca95a" : "white"} size="md">
            Profile
          </Heading>
        )}
      </NavLink>
      <NavLink to="/chat">
        {({ isActive }) => (
          <Heading color={isActive ? "#fca95a" : "white"} size="md">
            Chat
          </Heading>
        )}
      </NavLink>
    </HStack>
  );
}
