import { Card, Image, Stack, CardBody, Heading, Text, Box, Button } from "@chakra-ui/react";

export default function UserCard() {
  return (
    <Card
      bg="#07354f"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      textColor="white"
      mx="300px"
    >
      <Box margin="20px" display="flex" justifyContent="center" alignItems="center">
        <Image
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
          borderRadius="full"
          boxSize="100px"
        />
      </Box>

      <Stack>
        <CardBody px="0">
          <Heading size="md">First Name Last Name</Heading>
          <Text>Gender:</Text>
          <Text>About:</Text>
          <Text>Preferences:</Text>
        </CardBody>
      </Stack>

      <Button position="absolute" bottom="10px" right="10px" colorScheme="orange">
        Chat
      </Button>
    </Card>
  );
}
