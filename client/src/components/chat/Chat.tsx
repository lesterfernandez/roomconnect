import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { HStack, VStack, StackDivider, Text, Button } from "@chakra-ui/react";
import { useMessageStore } from "../../store";

export default function Chat() {
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
    <HStack h="full">
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
          <Link to={`/chat/${username}`}>
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
  );
}
