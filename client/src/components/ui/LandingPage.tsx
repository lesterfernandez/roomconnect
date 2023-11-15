import { ChakraProvider, VStack, Text, Box, Image, Flex, Button, Link } from "@chakra-ui/react";
import "./css/LandingPage.css";
import img from "./assets/palm-tree-3d.png";

export default function LandingPage() {
  return (
    <ChakraProvider>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "center" }} 
        align="center" 
        bgGradient="linear(to-b, #00293F, 55%, #D3DEE1)"
        height="100vh"
        position="relative" 
        p={4}
      >
        <Box position="absolute" top={4} right={4}>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button borderRadius="20px">Login</Button>
          </Link>
        </Box>
        <VStack
          align="left" // Center align VStack items
          spacing={4}
          pt={{ base: "1em", md: "2.5em" }}
        >
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
            <Button colorScheme="orange" borderRadius="20px" size="lg">
              Get Started
            </Button>
          </Link>
        </VStack>
        <Box top={30} display={{ base: "none", md: "block" }} alignSelf="flex-end" pr="15">
          <Image src={img} boxSize="sm" />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
