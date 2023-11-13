import {
  Card,
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

      <CardBody px="0" display="flex" flexDir={{ base: "column", sm: "row" }} gap="2">
        <Box
          display={{ base: "initial", sm: "flex" }}
          flexDir="column"
          justifyContent="space-around"
        >
          <Heading size="md">{props.profile.displayName}</Heading>
          <Wrap gap={2}>
            <WrapItem>
              <Tag>Gender: {attributes.gender[props.profile.gender.toLowerCase()]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Budget: {attributes.budget[props.profile.budget - 1]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Loudness: {attributes.loudness[props.profile.loudness - 1]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Cleanliness: {attributes.cleanliness[props.profile.cleanliness - 1]}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag>Co-Ed: {attributes.coed[+props.profile.coed]}</Tag>
            </WrapItem>
          </Wrap>
        </Box>
        <Button colorScheme="orange" ml="auto" mt="auto" minW={{ base: "100%", sm: "5rem" }}>
          Chat
        </Button>
      </CardBody>
    </Card>
  );
}
