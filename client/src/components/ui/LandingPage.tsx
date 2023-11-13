import { ChakraProvider, VStack, Text, Box, Image, Flex, Button, Link } from "@chakra-ui/react";
import "css/LandingPage.css";
import "assets/palm-tree-3d.png";

export default function LandingPage() {
  return (
    <ChakraProvider>
      <Flex justifyContent="flex-end" p={4}>
        <Button borderRadius="20px">Login</Button>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
        p={4}
        bgGradient="linear(to-b, #00293F, 55%, #D3DEE1)"
        height="100vh"
      >
        <VStack
          align="start"
          spacing={4}
          pl={{ base: "1em", md: "2em" }}
          pt={{ base: "1em", md: "2.5em" }}
        >
          <Text
            fontSize="2.5em"
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
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button colorScheme="orange" borderRadius="20px" size="lg">
              Get Started
            </Button>
          </Link>
        </VStack>
        <Box display={{ base: "none", md: "block" }} alignSelf="flex-end" pr="20">
          <Image src="assets/palm-tree-3d.png" boxSize="sm" />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
