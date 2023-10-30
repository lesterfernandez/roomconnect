import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { HStack, VStack } from "@chakra-ui/react";
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
    <HStack minH="100%">
      <VStack flexBasis="30%">
        {Object.keys(messages).map(username => (
          <Link to={`/chat/${username}`}>{username}</Link>
        ))}
      </VStack>
      <Outlet />
    </HStack>
  );
}
