import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Stack, HStack, VStack, StackDivider, Text, Box } from "@chakra-ui/react";
import { useMessageStore } from "../../store";

export default function ChatList() {
  function seedUsernames() {
    localStorage.setItem(
      "messages",
      JSON.stringify({
        lester: [
          { from: "javier", to: "lester", content: "yo sup" },
          { from: "lester", to: "lester", content: "whats up" },
          { from: "javier", to: "lester", content: "did you write the code?" },
          { from: "lester", to: "lester", content: "nah bro" },
        ],
        firas: [{ from: "javier", to: "firas", content: "yoooooo bro" }],
        enzo: [{ from: "javier", to: "enzo", content: "whats good" }],
      })
    );
  }

  const messages = useMessageStore();

  useEffect(() => {
    seedUsernames();
    const messages = JSON.parse(localStorage.getItem("messages") ?? "{}");
    useMessageStore.setState(messages);
  }, []);

  return (
    <HStack pos="relative" h="full">
      <Stack px="2" py="2" borderWidth="thin" borderColor="gray.200" shadow="md" w="18rem" h="100%">
        <VStack
          mt={2}
          divider={<StackDivider borderColor="gray.200" />}
          w="100%"
          h="100%"
          spacing={1}
          align="stretch"
        >
          {Object.keys(messages).map(username => (
            <Link to={`/chat/${username}`}>
              <Box
                w="100%"
                h="45px"
                px="2"
                py="1"
                rounded={3}
                cursor="pointer"
                _hover={{
                  background: "gray.100",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <Text fontSize="sm" as="b">
                  {username}
                </Text>
              </Box>
            </Link>
          ))}
        </VStack>
      </Stack>
      <Outlet />
    </HStack>
  );
}
