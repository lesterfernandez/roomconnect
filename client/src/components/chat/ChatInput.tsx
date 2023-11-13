import { Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Message } from "../../types";
import { useProfileStore } from "../../store/user";
import { useContext } from "react";
import { ChatContext } from "./Chat";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { username } = useParams();
  const { username: profileUsername } = useProfileStore();
  const { handleSendMessage } = useContext(ChatContext);

  return (
    <HStack
      width="100%"
      gap="0"
      as="form"
      onSubmit={event => {
        event.preventDefault();

        if (!username) return;

        const msg: Message = {
          content: message,
          from: profileUsername,
          to: username,
        };
        handleSendMessage(msg);
        setMessage("");
      }}
    >
      <Input
        roundedRight="none"
        placeholder="Write a message..."
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
      <Button roundedLeft="none" px="4" type="submit">
        Send
      </Button>
    </HStack>
  );
}
