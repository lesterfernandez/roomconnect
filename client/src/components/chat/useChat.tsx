import { useEffect, useState } from "react";
import { serverEventSchema } from "../../schemas";
import { useMessageStore } from "../../store/message";
import type { MessageStore } from "../../store/message";
import type { Message } from "../../types";
import { getToken } from "../../token";
import { useRef } from "react";
import { useProfileStore } from "../../store/user";
import { sendMessage } from "../../api/chat";

function handleLoadMessages(conversations: Message[]) {
  const messages: MessageStore = {};
  const { username } = useProfileStore.getState();

  for (let i = conversations.length - 1; i >= 0; i--) {
    const msg = conversations[i];
    const other = msg.from === username ? msg.to : msg.from;
    if (!messages[other]) messages[other] = [];
    messages[other]?.push(msg);
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

function handleMessage(event: MessageEvent) {
  if (event.data === "PONG") return;

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("running chat setup");

    const url = import.meta.env.VITE_SOCKET_URL + "?token=" + encodeURIComponent(getToken() ?? "");
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => setLoading(false);
    socketRef.current.addEventListener("message", handleMessage);
    const intervalId = setInterval(() => {
      socketRef.current?.send("PING");
    }, 1000 * 15);

    return () => {
      console.log("running chat teardown");

      socketRef.current?.removeEventListener("message", handleMessage);
      clearInterval(intervalId);
      socketRef.current?.close();
    };
  }, []);

  return {
    handleSendMessage: (message: Message) => {
      if (!socketRef.current) {
        console.error(`Tried to send message ${message} while WS is null`);
        return;
      }
      sendMessage(socketRef.current, message);
    },
    loading,
  };
}
