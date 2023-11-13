import { useEffect } from "react";
import { serverEventSchema } from "../../schemas";
import { useMessageStore } from "../../store/message";
import type { MessageStore } from "../../store/message";
import type { Message } from "../../types";
import { getToken } from "../../token";
import { useRef } from "react";

function handleLoadMessages(conversations: Message[]) {
  const messages: MessageStore = {};
  for (const msg of conversations) {
    messages[msg.from] = messages[msg.from] ?? [];
    messages[msg.from]?.push(msg);
  }
  useMessageStore.setState(messages);
}

function handleReceivedMessage(message: Message) {
  useMessageStore.setState(current => {
    const oldMessages = current[message.from] ?? [];
    return {
      ...current,
      [message.from]: [...oldMessages, message],
    };
  });
}

function handleChat(event: MessageEvent) {
  const data = JSON.parse(event.data);
  const parsedMessage = serverEventSchema.safeParse(data);

  if (!parsedMessage.success) {
    console.log(parsedMessage.error, data);
    return;
  }

  if (parsedMessage.data.type === "load") {
    handleLoadMessages(parsedMessage.data.conversations);
    return;
  }

  if (parsedMessage.data.type === "message") {
    const newMessage: Message = {
      from: parsedMessage.data.from,
      to: parsedMessage.data.to,
      content: parsedMessage.data.content,
    };
    handleReceivedMessage(newMessage);
    return;
  }
}

export default function useChatSetup() {
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    console.log("running chat setup");
    socketRef.current = new WebSocket(
      import.meta.env.VITE_SOCKET_URL + "?token=" + encodeURIComponent(getToken() ?? "")
    );
    socketRef.current.addEventListener("message", handleChat);

    return () => {
      console.log("running chat teardown");
      socketRef.current?.removeEventListener("message", handleChat);
      socketRef.current?.close();
    };
  }, []);

  return {
    handleSendMessage: (message: Message) => {
      useMessageStore.setState(current => {
        const oldMessages = current[message.to] ?? [];
        return {
          ...current,
          [message.to]: [...oldMessages, message],
        };
      });

      socketRef.current?.send(JSON.stringify(message));
    },
  };
}
