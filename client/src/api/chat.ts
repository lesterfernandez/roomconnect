import { useMessageStore } from "../store/message";
import type { Message } from "../types";

export function sendMessage(ws: WebSocket, message: Message) {
  useMessageStore.setState(current => {
    const oldMessages = current[message.to] ?? [];
    return {
      ...current,
      [message.to]: [...oldMessages, message],
    };
  });
  ws.send(JSON.stringify(message));
}
