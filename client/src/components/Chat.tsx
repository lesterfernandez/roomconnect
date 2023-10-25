import { useParams } from "react-router-dom";
import { useMessageStore } from "../store";
import { VStack, Tag, Text } from "@chakra-ui/react";

export default function Chat() {
  const { username } = useParams();
  const messages = useMessageStore();
  const conversations = messages[username ?? ""];

  return (
    <VStack flexBasis="70%">
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
