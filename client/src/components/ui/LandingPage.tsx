import "assets/palm-tree-3d.png";
import "css/LandingPage.css";
import {
  ChakraProvider,
  extendTheme,
  VStack,
  Text,
  CSSReset,
  Box,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Michroma'`,
    body: `'Michroma'`,
  },
  colors: {
    primary: {
      100: "#D3DEE1",
      900: "#00293F",
    },
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
        margin: 0,
        padding: 3,
        overflow: "hidden",
      },
      body: {
        bgGradient: "linear(to-b, primary.900, 55%, primary.100)",
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex justifyContent="flex-end">
        <Button borderRadius="20px">Login</Button>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
        p="4"
      >
        <VStack align="start" spacing="4" paddingLeft="2em">
          <Text
            fontFamily="heading"
            fontSize="2.5em"
            textAlign="left"
            lineHeight="1.2"
            paddingTop="2.5em"
            color="white"
          >
            Find your <br />
            <Text as="span" color="white">
              roommates in
            </Text>
            <br />
            Miami
          </Text>
          <Button colorScheme="orange" borderRadius="20px" mt="5">
            Get Started
          </Button>
        </VStack>
        <Box display={{ base: "none", md: "block" }} alignSelf="flex-end" pr="20">
          <Image src="src/assets/palm-tree-3d.png" boxSize="sm" />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
