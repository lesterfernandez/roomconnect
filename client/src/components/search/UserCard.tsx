import { Card, Image, Stack, CardBody, Heading, Text, Box, Button } from "@chakra-ui/react";
import type { UserProfile } from "../../types";

export default function UserCard(props: { profile: UserProfile }) {
  return (
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <Box margin="20px" display="flex" justifyContent="center" alignItems="center">
        <Image
          src={props.profile.profilePic}
          alt="Profile Picture"
          borderRadius="full"
          boxSize="100px"
        />
      </Box>

      <Stack>
        <CardBody px="0">
          <Heading size="md">{props.profile.displayName}</Heading>
          <Text>Gender: {props.profile.gender}</Text>
          <Text>Budget: {props.profile.budget}</Text>
          <Text>Loudness: {props.profile.loudness}</Text>
          <Text>Cleanliness: {props.profile.cleanliness}</Text>
          <Text>Co-Ed: {props.profile.cleanliness}</Text>
        </CardBody>
      </Stack>

      <Button position="absolute" bottom="10px" right="10px" colorScheme="orange">
        Chat
      </Button>
    </Card>
  );
}
