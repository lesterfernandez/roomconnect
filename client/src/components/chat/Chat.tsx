import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { HStack, VStack, StackDivider, Text, Button, Center, Box } from "@chakra-ui/react";
import { useMessageStore } from "../../store/message";
import useChatSetup from "./useChat";
import { createContext } from "react";
import Loading from "../ui/Loading";

type ChatContextType = ReturnType<typeof useChatSetup>;
export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export default function Chat() {
  const messages = useMessageStore();
  const chat = useChatSetup();

  if (Object.keys(messages).length === 0 && chat.loading) return <Loading />;

  return (
    <ChatContext.Provider value={chat}>
      {Object.keys(messages).length ? (
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
                  h="14"
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
                  <Box display="flex" justifyContent="space-between" pl="2">
                    <Box display="flex" flexDirection="column" w="full">
                      <Text fontSize="md" as="b">
                        {username}
                      </Text>
                      <Text
                        fontSize="sm"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        color="gray.600"
                      >
                        {messages[username]?.at(-1)?.content ?? ""}
                      </Text>
                    </Box>
                  </Box>
                </Button>
              </Link>
            ))}
          </VStack>
          <Outlet />
        </HStack>
      ) : (
        <Center flexDir="column" h="100%">
          <Text fontSize="lg">No conversations here...</Text>
          <Text fontSize="lg">Search for roommates and start chatting!</Text>
        </Center>
      )}
    </ChatContext.Provider>
  );
}
