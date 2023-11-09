import { create } from "zustand";
import type { Message } from "../types";

export type MessageStore = {
  [name: string]: Message[] | undefined;
};

export const useMessageStore = create<MessageStore>(() => ({}));
