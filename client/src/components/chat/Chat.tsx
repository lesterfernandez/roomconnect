import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { HStack, VStack, StackDivider, Text, Button } from "@chakra-ui/react";
import { useMessageStore } from "../../store/message";
import useChatSetup from "./useChat";
import { createContext } from "react";
import type { Message } from "../../types";

type ChatContextType = { handleSendMessage: (message: Message) => void };

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export default function Chat() {
  const messages = useMessageStore();
  const { handleSendMessage } = useChatSetup();

  return (
    <ChatContext.Provider value={{ handleSendMessage }}>
      <HStack h="full" gap="0">
        <VStack
          divider={<StackDivider borderColor="gray.200" my="0 !important" />}
          w="18rem"
          h="100%"
          align="stretch"
          borderWidth="thin"
          borderColor="gray.200"
          overflow="scroll"
        >
          {Object.keys(messages).map(username => (
            <Link to={`/chat/${username}`} key={username}>
              <Button
                w="100%"
                h="12"
                variant="unstyled"
                textAlign="start"
                px="4"
                py="1"
                rounded="none"
                _hover={{
                  background: "gray.100",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <Text fontSize="sm" as="b">
                  {username}
                </Text>
              </Button>
            </Link>
          ))}
        </VStack>
        <Outlet />
      </HStack>
    </ChatContext.Provider>
  );
}
