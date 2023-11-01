import { useParams } from "react-router-dom";
import { useMessageStore } from "../../store";
import { VStack, Tag, Text } from "@chakra-ui/react";

export default function Conversations() {
  const { username } = useParams();
  const messages = useMessageStore();
  const conversations = messages[username ?? ""];

  return (
    <VStack h="100%" w="100%" flexBasis="70%" overflow="scroll">
      {conversations.map(conversation => (
        <VStack alignSelf={conversation.from === username ? "flex-start" : "flex-end"} gap="0">
          <Tag
            size="lg"
            variant="solid"
            colorScheme={conversation.from === username ? "green" : "blue"}
          >
            {conversation.content}
          </Tag>
          <Text>By {conversation.from}</Text>
        </VStack>
      ))}
    </VStack>
  );
}
