import { Box, Text, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box bg="#01293f">
      <Flex p="5" gap="40px" m="0px 40px">
        <NavLink to="/">
          {({ isActive }) => (
            <Text color={isActive ? "#fca95a" : "white"} fontSize="xl">
              Search
            </Text>
          )}
        </NavLink>
        <NavLink to="/profile">
          {({ isActive }) => (
            <Text color={isActive ? "#fca95a" : "white"} fontSize="xl">
              Profile
            </Text>
          )}
        </NavLink>
        <NavLink to="/chat">
          {({ isActive }) => (
            <Text color={isActive ? "#fca95a" : "white"} fontSize="xl">
              Chat
            </Text>
          )}
        </NavLink>
      </Flex>
    </Box>
  );
}
