import { useParams } from "react-router-dom";
import { VStack, Tag } from "@chakra-ui/react";
import ChatInput from "./ChatInput";
import { useMessageStore } from "../../store/message";

export default function Conversations() {
  const { username } = useParams();
  const messages = useMessageStore();
  const conversations = username ? messages[username] ?? [] : [];

  return (
    <VStack h="100%" w="100%" overflow="scroll" justifyContent="flex-end" px="4" pb="4">
      {conversations.map((conversation, index) => (
        <VStack
          alignSelf={conversation.from === username ? "flex-start" : "flex-end"}
          gap="0"
          key={index}
        >
          <Tag
            size="lg"
            variant="solid"
            colorScheme={conversation.from === username ? "green" : "blue"}
          >
            {conversation.content}
          </Tag>
        </VStack>
      ))}
      <ChatInput />
    </VStack>
  );
}
