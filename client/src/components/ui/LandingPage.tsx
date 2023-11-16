import { ChakraProvider, VStack, Text, Box, Image, Flex, Button, Link } from "@chakra-ui/react";
import "./css/LandingPage.css";
import img from "./assets/palm-tree-3d.png";

export default function LandingPage() {
  return (
    <ChakraProvider>
      <Box bgGradient="linear(to-b, #00293F, 35%, #D3DEE1)" height="100vh">
        <Flex
          direction={{ base: "column", md: "row" }}
          h="100%"
          justify="space-around"
          maxW="container.xl"
          align="center"
          mx="auto"
          p={4}
        >
          <Box position="absolute" top={4} right={4}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </Link>
          </Box>
          <VStack align="left" spacing={4} pt={{ base: "1em", md: "2.5em" }}>
            <Text
              fontSize="3.0em"
              textAlign="left"
              lineHeight="1.2"
              color="white"
              fontFamily="'Michroma', sans-serif"
            >
              Find your <br />
              <Text as="span" color="white">
                roommates in
              </Text>
              <br />
              Miami
            </Text>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button colorScheme="orange" size="lg">
                Get Started
              </Button>
            </Link>
          </VStack>
          <Box display={{ base: "none", md: "block" }} pr="15">
            <Image src={img} boxSize="sm" />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
