import { Heading, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <VStack justifyContent="center" minH="100vh">
      <Heading textColor="#156087" size="2xl">
        404
      </Heading>
      <Heading textColor="#156087">Page Not Found</Heading>
    </VStack>
  );
}
