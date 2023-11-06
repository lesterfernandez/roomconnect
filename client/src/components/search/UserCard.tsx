import {
  Card,
  Stack,
  CardBody,
  Heading,
  Tag,
  Box,
  Button,
  Avatar,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { UserProfile } from "../../types";
import attributes from "../../attribute-text";

export default function UserCard(props: { profile: UserProfile }) {
  return (
    <Card direction={{ base: "column", sm: "row" }} p="2" gap={2} variant="outline">
      <Box margin="20px" display="flex" justifyContent="center" alignItems="center">
        <Avatar mx="auto" size="xl" src={props.profile.profilePic} />
      </Box>

      <Stack>
        <CardBody px="0">
          <Heading size="md" mb={2}>
            {props.profile.displayName}
          </Heading>
          <Wrap gap={2}>
            <WrapItem>
              <Tag>Gender: {props.profile.gender}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Budget: {attributes.budget[props.profile.budget]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Loudness: {attributes.loudness[props.profile.loudness]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Cleanliness: {attributes.cleanliness[props.profile.cleanliness]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Co-Ed: {attributes.coed[+props.profile.coed]}</Tag>
            </WrapItem>
          </Wrap>
        </CardBody>
      </Stack>

      <Button colorScheme="orange" ml="auto" mt="auto" minW={{ base: "100%", sm: "5rem" }}>
        Chat
      </Button>
    </Card>
  );
}
