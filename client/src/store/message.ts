import { create } from "zustand";
import type { Message } from "../types";

type MessageStore = {
  [name: string]: Message[] | undefined;
};

export const useMessageStore = create<MessageStore>(() => ({}));
