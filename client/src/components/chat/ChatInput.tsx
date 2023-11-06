import { Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { sendMessage } from "../../api/chat";
import { useParams } from "react-router-dom";
import type { Message } from "../../types";
import { useProfileStore } from "../../store";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { username } = useParams();
  const user = useProfileStore();

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
          sendMessage(msg);
        }}
      >
        Send
      </Button>
    </HStack>
  );
}
