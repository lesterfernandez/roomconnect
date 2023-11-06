import { Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Message } from "../../types";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { username } = useParams();

  return (
    <HStack width="100%" gap="0">
      <Input
        roundedRight="none"
        placeholder="Write a message..."
        value="message"
        onChange={event => setMessage(event.target.value)}
      />
      <Button
        roundedLeft="none"
        px="4"
        onClick={() => {
          if (!username) return;

          const msg: Message = {
            content: message,
            from: "",
            to: username,
          };
          console.log(msg);
          // sendMessage(msg);
        }}
      >
        Send
      </Button>
    </HStack>
  );
}
