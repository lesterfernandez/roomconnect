import { Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <Box bg="#01293f">
      <Flex p="5" gap="40px" m="0px 40px">
        <Link to="/">
          <Text color={location.pathname == "/" ? "#fca95a" : "white"} fontSize="xl">
            Search
          </Text>
        </Link>
        <Link to="/profile">
          <Text color={location.pathname == "/profile" ? "#fca95a" : "white"} fontSize="xl">
            Profile
          </Text>
        </Link>
        <Link to="/chat">
          <Text color={location.pathname == "/chat" ? "#fca95a" : "white"} fontSize="xl">
            Chat
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
