import { Card, Stack, CardBody, Heading, Text, Box, Button, Avatar } from "@chakra-ui/react";
import type { UserAttributes } from "../../types";

export default function UserCard(props: { profile: UserAttributes }) {
  return (
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <Box margin="20px" display="flex" justifyContent="center" alignItems="center">
        <Avatar mx="auto" size="xl" src={props.profile.profilePic} />
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
